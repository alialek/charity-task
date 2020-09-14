import React from 'react';
import { connect } from 'react-redux';
import kit from '../../../assets/kit.jpg';
import { getCollection } from '../../services/API';
import { closePopout, goBack, openModal, openPopout, setPage } from '../../store/router/actions';
import { setPost } from '../../store/formData/actions';
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';
import Icon20ViewOutline from '@vkontakte/icons/dist/20/view_outline';
import Icon24CommentOutline from '@vkontakte/icons/dist/24/comment_outline';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import {
	Div,
	Panel,
	Title,
	Separator,
	Text,
	Headline,
	Caption,
	Subhead,
	Alert,
	Group,
	Button,
	PanelHeader,
	Placeholder,
	InfoRow,
	Progress,
} from '@vkontakte/vkui';

class ViewerPanelBase extends React.Component {
	constructor(props) {
		super(props);
		this.onShare = this.onShare.bind(this);
		this.onPublishStory = this.onPublishStory.bind(this);
	}

	componentDidMount() {
		if (window.location.hash.includes('campaign')) {
			getCollection(window.location.hash.split('=')[1]).then((res) => {
				this.props.setPost(res.data);
			});
		}
	}

	onShare() {
		connect.send('VKWebAppShare', {
			link: `https://vk.com/app7595116#campaign=${window.location.hash.split('=')[1]}`,
		});
	}

	onPublishStory() {
		const canvas = document.createElement('canvas');

		const backgroundImg = new Image();
		backgroundImg.onload = () => {
			canvas.width = backgroundImg.width;
			canvas.height = backgroundImg.height;
			const context = canvas.getContext('2d');

			const base64 = canvas.toDataURL();

			connect.send('VKWebAppShowStoryBox', {
				background_type: 'image',
				blob: base64,
				attachment: {
					text: 'learn_more',
					type: 'url',
					url: 'https://vk.com/app7595116',
				},
			});
		};
		backgroundImg.src = kit;
	}

	render() {
		const { id, setPage } = this.props;

		return (
			<Panel id={id}>
				<div className="collection-cover" style={{ backgroundImage: `url(${kit})` }}></div>
				<Div>
					<Title level="1" weight="bold" style={{ margin: '4px 0' }}>
						Добряши помогают котикам
					</Title>
					<Subhead style={{ color: '#6D7885', marginBottom: 4 }} weight="medium">
						Автор Матвей Правосудов
					</Subhead>
					<Caption style={{ color: '#818C99' }} level="1" weight="regular">
						Сбор закончится через 5 дней
					</Caption>
					<Div style={{ paddingTop: '18px' }}>
						<Button stretched onClick={this.onShare}>
							Поделиться
						</Button>
					</Div>
					<Div style={{ paddingTop: '5px' }}>
						<Button stretched onClick={this.onPublishStory}>
							Поделиться в истории
						</Button>
					</Div>
					<Separator wide style={{ margin: '12px 0' }} />
					<Subhead weight="regular" style={{ margin: '4px 0 6px 0' }}>
						Нужно собрать до 10 сентября
					</Subhead>
					<div className="test-sosiska">
						<div className="test-sosiska-green" style={{ width: '75%' }}>
							<span>7 500 ₽</span>
						</div>
						<span>10 000 ₽</span>
					</div>
					<Separator wide style={{ margin: '12px 0' }} />
					<Text weight="regular">1</Text>
				</Div>
				<Separator wide />
				<div className="action-bar">
					<div className="actions">
						<div className="action">
							<Icon24LikeOutline />
							<Subhead weight="medium">65</Subhead>
						</div>
						<div className="action">
							<Icon24CommentOutline />
							<Subhead weight="medium">65</Subhead>
						</div>
						<div className="action">
							<Icon24ShareOutline />
							<Subhead weight="medium">4</Subhead>
						</div>
					</div>
					<div>
						<div style={{ width: 84 }} className="action">
							<Icon20ViewOutline />
							<Subhead weight="regular">7,2K</Subhead>
						</div>
					</div>
				</div>
				<Separator wide />
				<Group id="custom_progress_bar_block">
					<Div id="custom_progress_bar">
						<Subhead weight="regular" style={{ margin: '4px 0 6px 0' }}>
							Собрано 7 500 ₽ из 10 000 ₽
						</Subhead>
						<InfoRow>
							<Progress value={75} />
						</InfoRow>
					</Div>
					<Div style={{ paddingTop: '18px' }}>
						<Button size="l" mode="commerce">
							Помочь
						</Button>
					</Div>
				</Group>
			</Panel>
		);
	}
}

const mapDispatchToProps = {
	setPage,
	goBack,
	openPopout,
	closePopout,
	openModal,
	setPost
};

export default connect(null, mapDispatchToProps)(ViewerPanelBase);
