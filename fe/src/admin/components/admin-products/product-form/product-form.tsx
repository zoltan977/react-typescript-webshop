import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, FormGroup, FormHelperText, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import ProductCard from '../../../../shared/components/product-card/productCard';
import { routes } from '../../../../shared/constants/routes';
import useConfirm from '../../../../shared/hooks/useConfirm';
import { Product } from '../../../../shared/models/product.model';
import {
    add as addProduct,
    deleting as deleteProduct,
    get as getProduct,
    update as updateProduct,
} from '../../../../shared/services/product.service';
import { getCategoryList, ICategory } from '../../../../shared/services/type.service';
import globalErrorHandler from '../../../../shared/utils/globalErrorHandler';
import { handleFormErrors } from '../../../../shared/utils/handleFormErrors';
import history from '../../../../shared/utils/history';
import classes from './product-form.module.scss';
import {NumericFormat} from 'react-number-format';

const ProductForm = () => {
    const [Dialog, confirm, changeText]: [React.FC, () => Promise<boolean>, (newMessage: string) => void] = useConfirm(
        'Figyelem!',
        'Biztos hogy módosítod a termék adatait?',
    );
    const {id} = useParams();
    const [product, setProduct] = useState<Product>(new Product())
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    const resolver = classValidatorResolver(Product);
    const methods = useForm<Product>({
        mode: 'onChange',
        resolver,
    });
    const {control, setValue, setError, handleSubmit, watch, formState} = methods;
    const formValues = watch();
    

    const populateForm = () => {
        setValue("_id", product._id);
        setValue("title", product.title);
        setValue("category", product.category);
        setValue("imageURL", product.imageURL);
        setValue("price", product.price);
    }

    const save = async (formData: Product) => {
        changeText(!!id ? 'Biztos hogy módosítod a termék adatait?' : 'Hozzáadod ezt az új terméket?');
        const response = await confirm();
        if (response) {
            try {
                if (!!id) {
                    await updateProduct(formData)
                    toast.success("A változások sikeresen mentve!");
                    setProduct(new Product(formData));
                } else {
                    await addProduct(formData);
                    toast.success("Az új termék hozzáadva!");
                    history.push(routes.adminProducts);
                }
            } catch (error) {
                handleFormErrors(error, setError);
            }
        } else {
            if (!!id) {
                populateForm();
            }
        }
    }

    const deleting = async () => {
        if (!id) {
            return;
        }
        changeText('Biztos hogy törlöd  terméket?');
        const response = await confirm();
        if (response) {
            try {
                await deleteProduct(id);
                toast.success("A törlés sikeres!");
                history.push(routes.adminProducts);
            } catch (error) {
                globalErrorHandler(error);
            }
        }
    }

    const populateCategories = async () => {
        try {
            const categoryList = await getCategoryList();
            setCategoryList(categoryList as ICategory[]);
        } catch (error) {
            globalErrorHandler(error)            
        }
    }

    const populateProduct = async () => {
        if (!id ) {
            return;
        }

        try {
            const product = await getProduct(id);
            setProduct(new Product(product as Product));
        } catch (error) {
            globalErrorHandler(error)            
        }
    }

    
    useEffect(() => {
        populateForm()
    }, [product])

    useEffect(() => {
        populateProduct();
        populateCategories();
    }, [id])

    
    return (
        <div className={classes.component}>
            <form onSubmit={handleSubmit(save)}>
                <FormHelperText error={!!formState.errors._id}>
                        {formState.errors._id?.message}
                </FormHelperText>
                <FormGroup className={classes.group}>
                    <Controller
                        defaultValue=''
                        render={({ field, fieldState }) => {
                            return <TextField
                                        className={classes.input}
                                        onChange={field.onChange}
                                        value={field.value}
                                        fullWidth
                                        variant={'filled'}
                                        label={'Termék'}
                                        helperText={fieldState.error?.message}
                                        error={!!fieldState.error}
                                        type={'text'}
                                    />
                        }}
                        name={'title'}
                        control={control}
                    />
                    <Controller
                        defaultValue={0}
                        render={({ field, fieldState }) => {
                            return <NumericFormat
                            variant='filled'
                            className={classes.input}
                            fullWidth
                            customInput={TextField}
                            label={'Ár'}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            onChange={(event: any) => {
                                const value = parseInt(event.target.value.split(" ").join("") || 0);
                                field.onChange(value);
                            }}
                            value={field.value}
                            decimalSeparator="."
                            thousandSeparator=" "
                            decimalScale={0}
                            autoComplete="off"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">Ft</InputAdornment>
                                )
                            }}
                            />
                        }}
                        name={'price'}
                        control={control}
                    />
                    {
                        !!categoryList.length && <Controller
                            defaultValue=''
                            render={({ field, fieldState }) => {
                                return <TextField
                                            className={classes.input}
                                            onChange={field.onChange}
                                            value={field.value}
                                            fullWidth
                                            variant={'filled'}
                                            label={'Kategória'}
                                            helperText={fieldState.error?.message}
                                            error={!!fieldState.error}
                                            select
                                        >
                                            {
                                                categoryList.map((c, i) => <MenuItem key={i} value={c.name}>{c.displayName}</MenuItem>)
                                            }
                                        </TextField>
                            }}
                            name={'category'}
                            control={control}
                        />
                    }
                    <Controller
                        defaultValue=''
                        render={({ field, fieldState }) => {
                            return <TextField
                                        className={classes.input}
                                        onChange={field.onChange}
                                        value={field.value}
                                        fullWidth
                                        variant={'filled'}
                                        label={'Kép URL'}
                                        helperText={fieldState.error?.message}
                                        error={!!fieldState.error}
                                        type={'text'}
                                    />
                        }}
                        name={'imageURL'}
                        control={control}
                    />
                </FormGroup>
                <div className={classes.action}>
                    <Button type="submit" variant='contained' color='primary'>Mentés</Button>
                    {id && <Button type="button" variant='contained' color='warning' onClick={deleting}>Törlés</Button>}
                </div>
            </form>
            <ProductCard product={new Product({...formValues})} withoutActions />
            <Dialog />
        </div>
    )
}

export default ProductForm