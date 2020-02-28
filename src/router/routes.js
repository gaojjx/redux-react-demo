import Home from "../pages/home";
import UsersContainer from "../pages/user/UsersContainer";
import RecordContainer from "../pages/record/RecordContainer";
import CabinetContainer from "../pages/cabinet/CabinetContainer";
import CabinetDetail from "../pages/cabinet/components/CabinetDetail";

export const routes = [
    { path: '/home', component: Home },
    { path: '/user', component: UsersContainer },
    { path: '/record', component: RecordContainer },
    { path: '/cabinet/:id', component: CabinetDetail },
    { path: '/cabinet', exact: true, component: CabinetContainer },
]