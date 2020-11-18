import React from "react";
import Navbar from "../general/Navbar";
import Header from "./Header";
import Footer from "../general/Footer";
import Chart from "../general/Chart";
import { Main } from "./styles/HomeStyles";

interface Props {
}

function Home(props: Props): React.ReactElement {
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
