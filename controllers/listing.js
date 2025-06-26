const Listing=require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.showAllListings=async (req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewListingForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.createNewListing=async(req,res)=>{
    let response= await geocodingClient.forwardGeocode({
        query: req.body.listings.location,
        limit:1,
    })
    .send();
    console.log(response.body.features[0].geometry);
    let url=req.file.path;
    let filename=req.file.filename;
    let newListing=new Listing(req.body.listings);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;
    let savedListing=await newListing.save();
    console.log(savedListing);
    req.flash("success","New listing created..!!");
    console.log("Listing is saved");
    res.redirect("/listings");
};

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you have requested does not exist..");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.renderEditListingForm=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you have requested does not exist..");
        return res.redirect("/listings");
    }
    let originalImgUrl=listing.image.url;
    originalImgUrl=originalImgUrl.replace("/upload","/upload/w_250,h_200/");
    res.render("listings/edit.ejs",{listing,originalImgUrl});
};

module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    // if (!req.body.listings){
    //     throw new expressError(400,"Send valid data for listing.");
    // }
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listings});
    if(typeof(req.file)!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Listing details updated..!!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted..!!");
    console.log(deletedListing);
    res.redirect("/listings");
};