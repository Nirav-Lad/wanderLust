const Listing=require("./models/listing.js");
const Review=require("./models/reviews.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const expressError=require("./utils/ExpressError.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if (!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Login is required...");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if (res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of the listing..");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if (res.locals.currUser && !review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of the Review..");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing=(req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if (error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    } else{
        next();
    }
};

module.exports.validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if (error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    } else{
        next();
    }
}