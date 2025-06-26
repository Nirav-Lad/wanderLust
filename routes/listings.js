const express=require("express");
const router=express.Router()
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingContoller=require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingContoller.showAllListings))
.post(isLoggedIn,upload.single('listings[image]'),validateListing,wrapAsync(listingContoller.createNewListing));


// new listing form load route
router.get("/new",isLoggedIn,listingContoller.renderNewListingForm);

router.route("/:id")
.get(wrapAsync(listingContoller.showListing))
.put(isLoggedIn,isOwner,upload.single('listings[image]'),validateListing,wrapAsync(listingContoller.editListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingContoller.destroyListing));

// Edit listing form load route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingContoller.renderEditListingForm));

module.exports=router;