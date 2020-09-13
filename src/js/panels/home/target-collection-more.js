import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { goBack, openPopout, closePopout, openModal } from '../../store/router/actions';
import Icon28TargetOutline from '@vkontakte/icons/dist/28/target_outline';

import {
	Div,
	List,
	Panel,
	Group,
	FormLayout,
	Input,
	Button,
	PanelHeader,
	PanelSpinner,
	PanelHeaderBack,
	Header,
	Banner,
	Select,
	Textarea,
} from '@vkontakte/vkui';

class HomePanelTargetCollectionMore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
		};
	}

	render() {
		const { id, goBack, setPage } = this.props;

		return (
			<Panel id={id}>
				<PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>Оформление</PanelHeader>
				<Group>
					<FormLayout>
						<Select top="Автор" placeholder="Выберите цель поездки" value="0">
							<option value="0">Матвей Правосудов</option>
							<option value="1">Даниил Левоментов</option>
						</Select>
						<Button onClick={() => setPage('home', 'target-collection-more')} size="xl">Далее</Button>
					</FormLayout>
				</Group>
			</Panel>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		...bindActionCreators({ goBack, openPopout, closePopout, openModal }, dispatch),
	};
}

export default connect(null, mapDispatchToProps)(HomePanelTargetCollectionMore);
