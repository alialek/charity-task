import VKBridge from "@vkontakte/vk-bridge";

import {store} from "../../index";

import {setColorScheme, setAccessToken} from "../store/vk/actions";
import {setUser } from "../store/formData/actions";

const APP_ID = 6984089;
const API_VERSION = '5.92';

export const initApp = () => (dispatch) => {
    const VKConnectCallback = (e) => {
       
        if (e.detail.type === 'VKWebAppUpdateConfig') {
            VKBridge.unsubscribe(VKConnectCallback);
    
            dispatch(setColorScheme(e.detail.data.scheme));
        }
        
    };

    VKBridge.subscribe(VKConnectCallback);
    return VKBridge.send('VKWebAppInit', {}).then(data => {
        VKBridge.send("VKWebAppGetUserInfo", {}).then(res => {
			dispatch(setUser({name: `${res.first_name} ${res.last_name}`, id: res.id, photo: res.photo_100}))
		})
        return data;
    }).catch(error => {
        return error;
    });
};

export const getAuthToken = (scope) => (dispatch) => {
    VKBridge.send("VKWebAppGetAuthToken", {
        "app_id": APP_ID,
        "scope": scope.join(',')
    }).then(data => {
        dispatch(setAccessToken(data.access_token));
    }).catch(() => {
        dispatch(setAccessToken(null));
    });
};




export const closeApp = () => {
    return VKBridge.send("VKWebAppClose", {
        "status": "success"
    }).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOn = () => {
    return VKBridge.send("VKWebAppEnableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOff = () => {
    return VKBridge.send("VKWebAppDisableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const groupsGet = () => {
    return APICall('groups.get', {
        "extended": "1",
        "fields": "description",
        "count": "100"
    });
};

export const APICall = (method, params) => {
    params['access_token'] = store.getState().vkui.accessToken;
    params['v'] = params['v'] === undefined ? API_VERSION : params['v'];

    return VKBridge.send("VKWebAppCallAPIMethod", {
        "method": method,
        "params": params
    }).then(data => {
        return data.response;
    }).catch(error => {
        return error;
    });
};
