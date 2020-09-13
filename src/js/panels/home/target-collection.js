import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUploader from '../../components/ImageUploader';
import { goBack, openPopout, closePopout, openModal, setPage } from '../../store/router/actions';
import { setFormData } from '../../store/formData/actions';
import Icon28TargetOutline from '@vkontakte/icons/dist/28/target_outline';
import Icon28PictureOutline from '@vkontakte/icons/dist/28/picture_outline';

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

class HomePanelTargetCollection extends React.Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
		this.check = this.check.bind(this);
	}
	onDrop(pictureFiles, pictureDataURLs) {
		this.props.setFormData('picture', pictureDataURLs[0]);
	}
	check() {
		let { wallet, title, sum, target, description, picture } = this.props.form;
		console.log( wallet, title, sum, target, description, picture)
		return (
			(wallet >= 0 && wallet.length > 0) &&
			title.length > 0 &&
			Number(sum) > 0 &&
			target.length > 0 &&
			description.length > 0 &&
			(picture !== [] && picture.length > 0)
		);
	}
	render() {
		const { id, goBack, setPage, form, setFormData, user } = this.props;

		return (
			<Panel id={id}>
				<PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>Целевой сбор</PanelHeader>
				<Group>
					<FormLayout>
						<Div style={{ padding: '0 12px' }}>
							<ImageUploader
								withIcon={true}
								buttonText={
									<div className="uploader-inner">
										<Icon28PictureOutline fill="#3F8AE0" />
										<span>Загрузить обложку</span>
									</div>
								}
								onChange={this.onDrop}
								withPreview={true}
								singleImage={true}
								imgExtension={['.jpg', '.gif', '.png', '.gif']}
								maxFileSize={5242880}
							/>
						</Div>
						<Input
							type="text"
							top="Название сбора"
							placeholder="Название сбора"
							value={form.title}
							onChange={(e) => setFormData('title', e.target.value)}
						/>
						<Input
							type="number"
							top="Сумма, ₽"
							placeholder="Сколько нужно собрать?"
							value={form.sum}
							onChange={(e) => setFormData('sum', e.target.value)}
						/>
						<Input
							type="text"
							top="Цель"
							placeholder="Например, лечение человека"
							value={form.target}
							onChange={(e) => setFormData('target', e.target.value)}
						/>
						<Textarea
							top="Описание"
							placeholder="На что пойдет деньги и как они кому-то помогут?"
							value={form.description}
							onChange={(e) => setFormData('description', e.target.value)}
						/>
						<Select
							top="Куда получать деньги"
							placeholder="Выберите кошелек"
							onChange={(e) => setFormData('wallet', e.target.value)}
							value={form.wallet}
						>
							<option value="0">Счёт VK Pay · 1234</option>
							<option value="1">Счёт VK Pay · 1235</option>
							<option value="2">Счёт VK Pay · 1232</option>
						</Select>
						<Button
						  mode="primary"
							style={ this.check() ? {} : { opacity: 0.5, pointerEvents: 'none' }}
							onClick={() => (setPage('home', 'target-collection-more'), setFormData('type', 'target'))}
							size="xl"
						>
							Далее
						</Button>
					</FormLayout>
				</Group>
			</Panel>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		form: state.data.form,
	};
};

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		...bindActionCreators({ goBack, openPopout, closePopout, openModal, setPage, setFormData }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelTargetCollection);
