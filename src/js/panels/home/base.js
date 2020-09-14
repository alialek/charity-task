import React from 'react';
import { connect } from 'react-redux';
import { getCollections } from '../../services/API';
import { closePopout, goBack, openModal, openPopout, setPage } from '../../store/router/actions';
import { setPosts } from '../../store/formData/actions';

import { Div, Panel, Alert, Group, Button, PanelHeader, Placeholder, PanelSpinner } from '@vkontakte/vkui';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import VKPost from '../../components/VKPost/post';

class HomePanelBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};
	}

	componentDidMount() {
		getCollections()
			.then((res) => {
				this.props.setPosts(res.data);
			})
			.finally(() => {
				this.setState({ isLoading: false });
			});
	}

	render() {
		const { id, allPosts, setPage } = this.props;

		return (
			<Panel id={id}>
				<PanelHeader
					left={
						<PanelHeaderButton onClick={() => setPage('home', 'create-fee')}>
							<Icon28AddOutline />
						</PanelHeaderButton>
					}
				>
					Пожертвования
				</PanelHeader>
				{this.state.isLoading === true && <PanelSpinner />}
				{!this.state.isLoading && allPosts.length === 0 && (
					<Group>
						<Placeholder
							stretched={true}
							action={
								<Button size="m" onClick={() => setPage('home', 'create-fee')}>
									Создать сбор
								</Button>
							}
						>
							У Вас пока нет сборов. <br /> Начните доброе дело.
						</Placeholder>
					</Group>
				)}
				{!this.state.isLoading &&
					allPosts.length !== 0 &&
					allPosts.map((post, i) => <VKPost key={i} post={post} />)}
			</Panel>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		allPosts: state.data.allPosts,
	};
};

const mapDispatchToProps = {
	setPage,
	goBack,
	openPopout,
	closePopout,
	openModal,
	setPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelBase);
