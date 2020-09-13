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
			],
		};
	}

	render() {
		const { id, goBack, setPage, form, setFormData } = this.props;

		return (
			<Panel id={id}>
				<PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>Оформление</PanelHeader>
				<Group>
					<FormLayout>
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
						<div top="Сбор завершится">
							<Radio
								name="radio"
								value="1"
								onChange={(e) => setFormData('reasonToFinish', e.target.value)}
								defaultChecked
							>
								Когда соберем сумму
							</Radio>
							<Radio
								name="radio"
								value="2"
								onChange={(e) => setFormData('reasonToFinish', e.target.value)}
							>
								В определенную дату
							</Radio>
						</div>
						{true && (
							<Select
								top="Дата окончания"
								onChange={(e) => setFormData('until', e.target.value)}
								value={form.until}
								placeholder="Выберите дату"
							>
								<option value="0">Сегодня</option>
								<option value="1">Завтра</option>
							</Select>
						)}
						<Button
							mode={form.until >= 0 ? 'primary' : 'secondary'}
							onClick={() => setPage('home', 'target-collection-more')}
							size="xl"
							style={{ pointerEvents: form.until >= 0  ? '': 'none'}}
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
