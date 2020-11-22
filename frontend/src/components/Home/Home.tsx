import React, { useState } from "react";
import Axios from "axios";
import { stringify } from "querystring";
import Navbar from "../general/Navbar";
import Header from "./Header";
import Footer from "../general/Footer";
import Chart from "../general/Chart";
import { Main } from "./styles/HomeStyles";

interface Props {
}

function Home(props: Props): React.ReactElement {
    let [response, setResponse] = useState();

    return (
        <Main>
            <Navbar />
            {/* <Header /> */}
            <Chart />
            <Footer />
        </Main>
    );
}

export default Home;
