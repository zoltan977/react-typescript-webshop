import { MenuItem } from '@mui/material';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../../../shared/constants/routes';
import { ICategory, getCategoryList } from '../../../../shared/services/type.service';
import globalErrorHandler from '../../../../shared/utils/globalErrorHandler';
import classes from './categories.module.scss';

interface CategoriesProps {
    category: string | null;
}

const Categories: React.FC<CategoriesProps> = ({category}) => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    const populateCategories = async () => {
        try {
            const categories = await getCategoryList() as ICategory[];
            console.log("categories: ", categories)
            setCategories(categories);
        } catch (error) {
            globalErrorHandler(error)            
        }
    }
    
    useEffect(() => {
      populateCategories()
    }, [])
    
    return (
        <div className={classes.component}>
            <MenuItem 
                component={Link}
                className={classnames(classes.link, {[classes.active]: !category})}
                to={routes.home}>
                    Összes
            </MenuItem>
            {
                categories.map((c, i) => <MenuItem 
                    component={Link}
                    className={classnames(classes.link, {[classes.active]: category === c.name})}
                    key={i} 
                    to={{
                        pathname: routes.home,
                        search: `?category=${c.name}`,
                    }}>
                        {c.displayName}
                </MenuItem>)
            }
        </div>
    )
}

export default Categories