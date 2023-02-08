import './App.css';
import {useLocation} from "react-router-dom";
import React from "react";
import Iframe from "@nicholasadamou/react-iframe";
import { useOktaAuth } from '@okta/okta-react';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function JspView() {
    const { authState} = useOktaAuth();
    const token = authState.accessToken.accessToken;
    console.log(token)
    const query = useQuery();
    let param1 = query.get("param1");
    console.log(param1)

    return (<div>
        <h3>Jsp in React demo</h3>
        <div id = "jsp"></div>
        <Iframe id={"jsp"}
                width={1000} height={500}
                title={"Jsp in React demo"}
                loading='lazy'
                src={"http://localhost:8081/JavaEEHelloWorld-1.0-SNAPSHOT/?param1="+param1}
                headers={{
                    Authorization: `Bearer ${token}`,
                    Accept: "text/html"
                }}
        />

    </div>);
}
