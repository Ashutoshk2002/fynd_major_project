import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController=async(req,res)=>{
try {
    const {name} =req.body
    if(!name){
        return res.status(400).send({message:'Name is required'})
    }
    const existingCategory=await categoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:'Category Already Exists'
        })
    }
    const category=await new categoryModel({name,slug:slugify(name)}).save()
    res.status(200).send({
        success:true,
        message:'New Category Created'
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in Category',
        error
    })
}
}

//update category controller
export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'Successfully updated Category',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating category'
        })
    }

}

//get all categories
export const categoryController=async(req,res)=>{
     try {
        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'All Categories fetched',
            category
        })
     } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all categories'
        })
     }
}

//get single categories
export const singleCategoryController=async(req,res)=>{
    try {
       const category=await categoryModel.find({slug:req.params.slug})
       res.status(200).send({
           success:true,
           message:'Single Categories fetched',
           category
       })
    } catch (error) {
       console.log(error);
       res.status(500).send({
           success:false,
           error,
           message:'Error while getting single categories'
       })
    }
}

//delete category
export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
       await categoryModel.findByIdAndDelete(id)
       res.status(200).send({
           success:true,
           message:'Successfully Deleted Category',
       })
    } catch (error) {
       console.log(error);
       res.status(500).send({
           success:false,
           error,
           message:'Error while deleting category'
       })
    }
}

