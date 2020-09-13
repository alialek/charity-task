import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendCollection } from '../../services/API';

import { setFormData } from '../../store/formData/actions';
import { goBack, openPopout, closePopout, openModal, setPage } from '../../store/router/actions';
import bridge from '@vkontakte/vk-bridge';
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
		this.state = {};
		this.check = this.check.bind(this);
		this.done = this.done.bind(this)
	}


	done() {
		this.props.setPage('home', 'target-collection-publish')
		this.props.setFormData('type', 'target');
		sendCollection(this.props.form, 'target');
	}

	check() {
		let { author, reasonToFinish, until } = this.props.form;
		return (
			reasonToFinish.length > 0 &&
			author.name.length > 0 &&
			(reasonToFinish === '1' || (reasonToFinish === '2' && until.length > 0))
		);
	}
	render() {
		const { id, goBack, setPage, form, setFormData, user } = this.props;

		return (
			<Panel id={id}>
				<PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>Оформление</PanelHeader>
				<Group>
					<FormLayout>
						<Select
							top="Автор"
							placeholder="Выберите автора"
							onChange={(e) =>
								setFormData('author', {
									id: e.target.value,
									name: e.target.name,
								})
							}
							value={form.author.id}
						>
							<option value={user.id} name={user.name} key={user.id}>
								{user.name}
							</option>
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
							mode={this.check() ? 'primary' : 'secondary'}
							onClick={this.done}
							style={{ pointerEvents: this.check() ? '' : 'none' }}
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
		...bindActionCreators({ goBack, openPopout, closePopout, openModal, setFormData, setPage }, dispatch),
	};
}

const mapStateToProps = (state) => {
	return {
		form: state.data.form,
		user: state.data.user,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelTargetCollectionMore);
