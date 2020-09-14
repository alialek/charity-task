import React from 'react';
import { connect } from 'react-redux';
import { bridge } from '@vkontakte/vk-bridge';
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
	PanelSpinner,
	PanelHeaderBack,
	Progress,
} from '@vkontakte/vkui';

class ViewerPanelBase extends React.Component {
	constructor(props) {
		super(props);
		this.onShare = this.onShare.bind(this);
		this.getDate = this.getDate.bind(this);
		this.onPublishStory = this.onPublishStory.bind(this);
		this.state = {
			loaded: false,
			have: 0,
		};
	}

	componentDidMount() {
		if (window.location.hash.includes('campaign')) {
			getCollection(window.location.hash.split('=')[1])
				.then((res) => {
					this.props.setPost(res.data);
					this.setState({ loaded: true });
					this.setState({ have: Math.floor(Math.random() * Number(res.data.sum)) });
				})
				.finally(() => {
					this.setState({ loaded: true });
				});
		}
	}

	onShare() {
		connect.send('VKWebAppShare', {
			link: `https://vk.com/app7595116#campaign=${window.location.hash.split('=')[1]}`,
		});
	}

	getDate(time) {
		const date = time.split('T')[0];
		const [year, mounth, day] = date.split('-');
		if (mounth == '09') {
			return `${day} сентября ${year}`;
		}
		return `${day}.${mounth}.${year}`;
	}

	onPublishStory() {
		const { post } = this.props;
		const canvas = document.createElement('canvas');

		const backgroundImg = new Image();
		backgroundImg.onload = () => {
			canvas.width = backgroundImg.width;
			canvas.height = backgroundImg.height;
			const context = canvas.getContext('2d');

			context.drawImage(backgroundImg, 0, 0);

			const iconImg = new Image();
			iconImg.onload = () => {
				context.drawImage(iconImg, canvas.width / 2 - 37.5, 50);

				context.beginPath();
				context.moveTo(canvas.width / 2, 0);
				context.lineTo(canvas.width / 2, canvas.height);

				context.textAlign = 'center';

				context.fillStyle = "#fff";
				context.font = "30px Verdana";
				context.fillText('Я поддерживаю сбор', canvas.width / 2, canvas.height / 2 - 80);

				context.fillStyle = "#fff";
				context.font = "bold 48px Verdana";
				context.fillText(post.title, canvas.width / 2, canvas.height / 2);

				const base64 = canvas.toDataURL();

				bridge.send("VKWebAppShowStoryBox", {
					"background_type": "image",
					"blob": base64,
					"attachment": {
						"text": "learn_more",
						"type": "url",
						"url": "https://vk.com/app7267167"
					}
				});
			};
			iconImg.src = './img/icon_for_story.png';
		};
		backgroundImg.src = './img/story.png';
	}

	render() {
		const { id, setPage, post } = this.props;

		return (
			<Panel id={id}>
				<PanelHeader
					left={<PanelHeaderBack onClick={() => goBack()} />}
					transparent={true}
					visor={false}
				></PanelHeader>
				{!this.state.loaded ? (
					<PanelSpinner />
				) : (
					<div>
						<div className="collection-cover" style={{ backgroundImage: `url(${kit})` }}></div>
						<Div>
							<Title level="1" weight="bold" style={{ margin: '4px 0' }}>
								{`${post.title}`}
							</Title>
							<Subhead style={{ color: '#6D7885', marginBottom: 4 }} weight="medium">
								{`Автор ${post.author.name}`}
							</Subhead>
							<Caption style={{ color: '#818C99' }} level="1" weight="regular">
								Сбор закончится через 5 дней
							</Caption>

							<Separator wide style={{ margin: '12px 0' }} />
							<Subhead className="sosiska-desc" weight="regular" style={{ margin: '4px 0 6px 0' }}>
								<div> {`Нужно собрать до ${this.getDate(post.until)}`}</div>
								<div>
									{(this.state.have / post.sum) * 100 > 75 && <span>{`${post.sum}`} ₽</span>}
								</div>
							</Subhead>
							<div className="test-sosiska" style={{display: (this.state.have / post.sum) * 100 < 25 && 'flex'}}>
								<div

									className="test-sosiska-green"
									style={{ width: `${(this.state.have / post.sum) * 100}%` }}
								>
									<span>{`${this.state.have}`} ₽</span>
								</div>
								<div style={{width: '80px', marginLeft: '10px'}}>
								{(this.state.have / post.sum) * 100 < 25 &&	(`${this.state.have} ₽`)}
								</div>
								{((this.state.have / post.sum) * 100 <= 75 &&
									(this.state.have / post.sum) * 100 >= 25) && <span>{`${post.sum}`} ₽</span>}
							</div>
							<Separator wide style={{ margin: '12px 0' }} />
							<Text weight="regular">{post.description}</Text>
						</Div>
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
									{`Собрано ${this.state.have} ₽ из ${post.sum} ₽`}
								</Subhead>
								<InfoRow>
									<Progress value={(this.state.have / post.sum) * 100} />
								</InfoRow>
							</Div>
							<Div style={{ paddingTop: '18px' }}>
								<Button size="l" mode="commerce">
									Помочь
								</Button>
							</Div>
						</Group>
					</div>
				)}
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
	setPost,
};

const mapStateToProps = (state) => {
	return {
		post: state.data.post,
		viewsHistory: state.router.viewsHistory
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewerPanelBase);
