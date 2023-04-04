const Video = require("../models/VideoModel");
const path = require("path");
const fs = require("fs");

export const getVideos = async(req, res) => {
    try {
        const video = await Video.findAll();
        res.status(200).json(videos);
        res.render("table", {
            title: "BNI | Video",
            video,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getVideoById = async(req, res) => {
    try {
        const response = await Video.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

