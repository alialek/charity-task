import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { goBack, openPopout, closePopout, openModal, setPage } from '../../store/router/actions';
import Icon28TargetOutline from '@vkontakte/icons/dist/28/target_outline';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';

import {
	Div,
	List,
	Panel,
	Group,
	Button,
	PanelHeader,
	PanelSpinner,
	PanelHeaderBack,
	Header,
	Banner,
} from '@vkontakte/vkui';

class HomePanelCreateFee extends React.Component {
	render() {
		const { id, goBack, setPage } = this.props;

		return (
			<Panel id={id}>
				<PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>Тип сбора</PanelHeader>
				<Group>
					<div style={{ flexDirection: 'column' }} className="Placeholder Placeholder--stretched Placeholder--target">

							<Banner
                            className="target-banner"

								before={<Icon28TargetOutline fill="#3F8AE0" />}
								header="Целевой сбор"
								subheader="Когда есть определённая цель"
								asideMode="expand"
                                onClick={() => setPage('home', 'target-collection')}
							/>


							<Banner
                             className="target-banner"

								before={<Icon28CalendarOutline fill="#3F8AE0" />}
								header="Регулярный сбор"
								subheader="Если помощь нужна ежемесячно"
								asideMode="expand"
								onClick={() => console.log('[Podcast banner] onClick')}
							/>

					</div>
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



export default connect(null, mapDispatchToProps)(HomePanelCreateFee);
