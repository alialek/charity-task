import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Div, Panel, Alert, Group, Button, PanelHeader, Placeholder} from "@vkontakte/vkui"

class HomePanelBase extends React.Component {


  

    render() {
        const {id, setPage} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Пожертвования</PanelHeader>
                <Group>
                <Placeholder
           stretched={true}
           
            action={<Button size="m"  onClick={() => setPage('home', 'create-fee')}>Создать сбор</Button>}
          >
           У Вас пока нет сборов. <br/> Начите доброе дело. 
          </Placeholder>
                    
                   
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
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);
