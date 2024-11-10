import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Topic from "../pages/Topic";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Answers from "../pages/Answers";
import PrivateRoutes from "../components/PrivateRoutes/index";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />
            },            
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "logout",
                element: <Logout />
            },
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: "topic",
                        element: <Topic />
                    },
                    {
                        path: "quiz/:id",
                        element: <Quiz />
                    },
                    {
                        path: "answers",
                        element: <Answers />
                    },
                    {
                        path: "result",
                        element: <Result />
                    },
                ]
            },
        ]
    }
];


// {/* <Routes>
//     <Route path='/' element={<LayoutDefault />}>
//     <Route index element={<Home />}/>
//     <Route path='about' element={<About />}/>
//     <Route path='blog' element={<Blog />}>
//         <Route index element={<BlogAll />}/>
//         <Route path=':id' element={<BlogDetail />}/>
//         <Route path='fashion' element={<BlogFashion />}/>
//         <Route path='travel' element={<BlogTravel />}/>
//     </Route>
//     <Route path='contact' element={<Contact />}/>
//     <Route path='login' element={<Login />}/>
//     <Route element={<PrivateRoutes />}>
//         <Route path='info-user' element={<InfoUser />}/>
//     </Route>
//     {/* <Route path='*' element={<Error404 />}/> */}
//     <Route path='*' element={<Navigate to='/' />}/>
//     </Route>
// </Routes> */}