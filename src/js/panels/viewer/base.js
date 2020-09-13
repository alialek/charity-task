import React from 'react';
import { connect } from 'react-redux';
import kit from '../../../assets/kit.jpg';
import { closePopout, goBack, openModal, openPopout, setPage } from '../../store/router/actions';
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
} from '@vkontakte/vkui';

class ViewerPanelBase extends React.Component {
	render() {
		const { id, setPage } = this.props;

		return (
			<Panel id={id}>
				<div className="collection-cover" style={{ backgroundImage: `url(${kit})` }}></div>
				<Div>
					<Title level="1" weight="bold" style={{ margin: '4px 0' }}>
						Добряши помогают котикам
					</Title>
					<Subhead style={{ color: '#6D7885' }} weight="medium" style={{ marginBottom: 4 }}>
						Автор Матвей Правосудов
					</Subhead>
					<Caption style={{ color: '#818C99' }} level="1" weight="regular">
						Сбор закончится через 5 дней
					</Caption>

					<Separator style={{ margin: '12px 0' }} />
					<Subhead weight="regular" style={{ margin: '4px 0 6px 0' }}>
                    Нужно собрать до 10 сентября
					</Subhead>
                    <div className="test-sosiska"></div>
                    <Separator style={{ margin: '12px 0' }} />
                    <Text weight="regular">
                    Привет-привет, добряш!

Я создал это событие, чтобы показать какие у меня прекрасные добряши и буду счастлив, если получится вдохновить кого-нибудь хотя бы на маленький перевод в пользу фонда Юна. 

◾ Если получится собрать 1 000 рублей, то это будет 5 обработанных животных от блох и клещей.

◾ Собранные 5 000 рублей превратятся в 25 кг корма для подопечных фонда.

◾ А 10 000 рублей позволят провести курс занятий с кинологом по социализации сложной собаки. Чтобы она легче нашла свой дом.

В благотворительности не бывает маленьких сумм, поэтому если вы хотите помочь, то переведите любую сумму, будь-то 10 рублей или 1000 💚
                    </Text>
                    
				</Div>
                <Separator/>
                <div className="action-bar">
                    <div className="actions">
                        <div className="action">
                            <Icon24LikeOutline/>
                            <Subhead weight="medium">65</Subhead>
                        </div>
                        <div className="action">
                            <Icon24CommentOutline/>
                            <Subhead weight="medium">65</Subhead>
                        </div>
                        <div className="action">
                            <Icon24ShareOutline/>
                            <Subhead weight="medium">65</Subhead>
                        </div>
                    </div>
                    <div>
                    <div style={{width: 84}} className="action">
                            <Icon20ViewOutline/>
                            <Subhead weight="regular">7,2K</Subhead>
                        </div>
                    </div>
                </div>
                <Separator wide/>
                <Div>
                    
                </Div>
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
};

export default connect(null, mapDispatchToProps)(ViewerPanelBase);
