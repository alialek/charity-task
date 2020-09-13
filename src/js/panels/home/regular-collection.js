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

class HomePanelRegularCollection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authors: [
				{
					name: 'Павел Дуров',
					id: 1,
				},
			],
		};
		this.onDrop = this.onDrop.bind(this);
		this.check = this.check.bind(this);
	}
	onDrop(pictureFiles, pictureDataURLs) {
		this.props.setFormData('pictures', pictureFiles);
	}
	check() {
		let { wallet, title, sum, target, description, picture } = this.props.form;
		return (
			wallet >= 0 &&
			title.length > 0 &&
			Number(sum) > 0 &&
			target.length > 0 &&
			description.length > 0 &&
			picture !== []
		);
	}
	render() {
		const { id, goBack, setPage, form, setFormData } = this.props;

		return (
			<Panel id={id}>
				<PanelHeader separator={false} left={<PanelHeaderBack onClick={() => goBack()} />}>Тип сбора</PanelHeader>
			
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
							value={form.name}
							onChange={(e) => setFormData('name', e.target.value)}
						/>
						<Input
							type="text"
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
						<Select
							top="Автор"
							placeholder="Выберите автора"
							onChange={(e) => setFormData('author', { id: e.target.value, name: e.target.name })}
							value={this.state.authors[0].id}
						>
							{this.state.authors.map((author) => (
								<option value={author.id} key={author.id} name={author.name}>
									{author.name}
								</option>
							))}
						</Select>
						<Button
							mode={this.check() ? 'primary' : 'secondary'}
							style={{ pointerEvents: this.check() ? '' : 'none' }}
							onClick={() => (console.log('ВЫЗВАТЬ БРИДЖ'), setFormData('type', 'target'))}
							size="xl"
						>
							Далее
						</Button>
					</FormLayout>
			
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelRegularCollection);