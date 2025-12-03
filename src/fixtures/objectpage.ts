import {test as base} from "@playwright/test"
import { LoginPage } from "../pages/login/loginpage"
import { InputsPage } from "../pages/InputPage";

const test = base.extend<{
    loginPage: LoginPage
    inputPage: InputsPage

}>({
    loginPage: async({page}, use) =>{
        await use(new LoginPage(page));
    },

    inputPage: async({page}, use) =>{
        await use(new InputsPage(page));   
    }
});

export default test;