import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFormData } from '../../store/formData/actions';
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
	Radio,
} from '@vkontakte/vkui';

class HomePanelTargetCollectionMore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authors: [
				{
					name: 'Павел Дуров',
					id: 1,
				},
				{
					name: 'Стив Джобс',
					id: 2,
				},
			],
		};
		this.check = this.check.bind(this);
	}
	check() {
		let { author, reasonToFinish, until } = this.props.form;
		return (
			reasonToFinish.length > 0 &&
			author.name.length > 0 &&
			(reasonToFinish === '1' || reasonToFinish === '2' && until.length > 0)
		);
	}
	render() {
		const { id, goBack, setPage, form, setFormData } = this.props;
		console.log(form);

		return (
			<Panel id={id}>
				<PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>Оформление</PanelHeader>
				<Group>
					<FormLayout>
						<Select
							top="Автор"
							placeholder="Выберите автора"
							onChange={(e) => setFormData('author', { id: e.target.value, name: this.state.authors[e.target.value - 1].name })}
							value={form.author.id}
						>
							{this.state.authors.map((author) => (
								<option value={author.id} key={author.id}>
									{author.name}
								</option>
							))}
						</Select>
						<div top="Сбор завершится">
							<Radio
								name="radio"
								value="1"
								onChange={(e) => setFormData('reasonToFinish', e.target.value)}
								defaultChecked={form.reasonToFinish === '1'}
							>
								Когда соберем сумму
							</Radio>
							<Radio
								name="radio"
								value="2"
								onChange={(e) => setFormData('reasonToFinish', e.target.value)}
								defaultChecked={form.reasonToFinish === '2'}
							>
								В определенную дату
							</Radio>
						</div>
						{form.reasonToFinish === '2' && (
							<Input
								type="date"
								top="Дата окончания"
								placeholder="Выберите дату"
								value={form.until}
								onChange={(e) => setFormData('until', e.target.value)}
							/>
						)}
						<Button
						  mode="primary"
							style={ this.check() ? {} : { opacity: 0.5, pointerEvents: 'none' }}
							onClick={() => setPage('home', 'target-collection-publish')}
							size="xl"
						>
							Создать сбор
						</Button>
					</FormLayout>
				</Group>
			</Panel>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		...bindActionCreators({ goBack, openPopout, closePopout, openModal, setFormData }, dispatch),
	};
}

const mapStateToProps = (state) => {
	return {
		form: state.data.form,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelTargetCollectionMore);
