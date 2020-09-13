import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { goBack, openPopout, closePopout, openModal, setPage } from '../../store/router/actions';
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

class HomePanelTargetCollection extends React.Component {
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
				<PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>Тип сбора</PanelHeader>
				<Group>
					<FormLayout>
						<Div>
							Место для блока с загрузкой фото 
						</Div>
						<Input type="text" top="Название сбора" placeholder="Название сбора" value={this.name} />
						<Input type="text" top="Сумма, ₽" placeholder="Сколько нужно собрать?" value={this.sum} />
						<Input type="text" top="Цель" placeholder="Например, лечение человека" value={this.sum} />
						<Textarea top="Описание" placeholder="На что пойдет деньги и как они кому-то помогут?" />
						<Select top="Куда получать деньги" placeholder="Выберите цель поездки" value="0">
							<option value="0">Счёт VK Pay · 1234</option>
							<option value="1">Счёт VK Pay · 1235</option>
							<option value="2">Счёт VK Pay · 1232</option>
						</Select>
						<Button  onClick={() => setPage('home', 'target-collection-more')} size="xl">Далее</Button>
					</FormLayout>
				</Group>
			</Panel>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		...bindActionCreators({ goBack, openPopout, closePopout, openModal, setPage }, dispatch),
	};
}

export default connect(null, mapDispatchToProps)(HomePanelTargetCollection);
