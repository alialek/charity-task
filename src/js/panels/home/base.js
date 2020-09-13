import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Div, Panel, Alert, Group, Button, PanelHeader, Placeholder} from "@vkontakte/vkui"
import Icon28AddOutline from "@vkontakte/icons/dist/28/add_outline";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import VKPost from "../../components/VKPost/post";

class HomePanelBase extends React.Component {


  

    render() {
        const {id, allPosts, setPage} = this.props;

        return (
            <Panel
                id={id}
            >
                <PanelHeader
                    left={<PanelHeaderButton onClick={() => setPage('home', 'create-fee')}>
                        <Icon28AddOutline />
                        </PanelHeaderButton>}
                >Пожертвования</PanelHeader>
                {allPosts.length === 0 &&
                (<Group>
                        <Placeholder stretched={true}
                                     action={<Button size="m"  onClick={() => setPage('home', 'create-fee')}>Создать сбор</Button>}>
                                    У Вас пока нет сборов. <br/> Начните доброе дело.
                        </Placeholder>
                </Group>)}
                {allPosts.length !== 0 && allPosts.map((post, i)=> <VKPost key={i}  post={post}/>)}

            </Panel>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        allPosts: state.data.allPosts,
    };
};

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelBase);
