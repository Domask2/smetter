import * as React from 'react';
import {Route} from 'react-router';
import {Routes} from 'react-router-dom';
import Home from '../page/home/Home';
import Content from '../page/content/Content';
import Recipe from '../page/recipe/Recipe';
import Price from "../page/price/Price";
import Combo from "../page/combo/Combo";
import Recipes from "../page/recipes/Recipes";
import CookingTime from "../page/cookingTime/CookingTime";
import Serving from "../page/serving/Serving";

import {routing} from "../service/data";
import {routI} from "../service/type";

const Routing = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}>
                {routing &&
                    routing.map((rout: routI) => {
                        return (
                            rout.children && rout.children.map((item: any) => {
                                return (
                                    <Route path={`${rout.key}/${item.key}`}
                                           element={<Content />}>
                                        <Route path={'recipes'}
                                               element={<Recipes title={item.title}
                                                                 path={`${rout.title}/${item.title}`}/>}>
                                            <Route path={'recipe'}
                                                   element={<Recipe/>}/>
                                            <Route path={'cooking-time'} element={<CookingTime/>}/>
                                            <Route path={'serving'} element={<Serving/>}/>
                                        </Route>
                                        <Route path={'price'} element={<Price/>}/>
                                        <Route path={'combo'} element={<Combo/>}/>
                                    </Route>
                                )
                            })
                        );
                    })}
            </Route>
        </Routes>
    );
};

export default Routing;
