const express = require("express");
const profileController = require("../controllers/ProfileController");
const toDoListController = require("../controllers/ToDoListController");
const authVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const router = express.Router();


router.post("/CreateProfile",profileController.CreateProfile);
router.post("/UserLogin",profileController.UserLogin);
router.get("/SelectProfile",authVerifyMiddleware,profileController.SelectProfile);
router.post("/UpdateProfile",authVerifyMiddleware,profileController.UpdateProfile);


router.post("/CreateToDo",authVerifyMiddleware,toDoListController.CreateToDo);
router.get("/SelectToDo",authVerifyMiddleware,toDoListController.SelectToDo);
router.post("/UpdateToDo",authVerifyMiddleware,toDoListController.UpdateToDo);
router.post("/UpdateStatus",authVerifyMiddleware,toDoListController.UpdateStatusToDo);
router.post("/RemoveToDo",authVerifyMiddleware,toDoListController.RemoveToDo);
router.get("/SelectToDoByStatus",authVerifyMiddleware,toDoListController.SelectToDoByStatus);
router.get("/SelectToDoByDate",authVerifyMiddleware,toDoListController.SelectToDoByDate);




module.exports = router;