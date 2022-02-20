const router = require("express").Router();
const {
  restrict,
  redirect,
  tokenCheck,
  loginToken,
  adminOnly,
} = require("../middleware");
const controller = require("../controllers");

// Page Router
router.get("/", controller.home.index);
router.get("/login", controller.login.index);
router.get("/register", controller.register.index);
router.get("/history", controller.roomHistory.index);

router.get("/auth/logout", controller.auth.logout);
router.post("/auth/login", controller.auth.login);
router.post("/auth/register", controller.auth.register);

router.post("/profile/update", controller.profileController.update);
router.post("/dashboard/add", controller.dashboard.create);
router.post("/dashboard/edit/:id", controller.dashboard.update);
router.post("/dashboard/delete/:id", controller.dashboard.delete);

router.post("/room/create", controller.games.create);
router.put("/room/update/:id", controller.games.result);
router.put("/user/update/win/:id", controller.games.add_win);
router.put("/user/update/lose/:id", controller.games.add_lose);
router.put("/user/update/score/:id", controller.games.add_score);

// Protected page
router.get("/dashboard", redirect, controller.dashboard.index);
router.get("/dashboard/*", redirect, controller.dashboard.handler);
router.get("/profile", redirect, controller.profileController.index);
router.get("/room-list", redirect, controller.roomList.index);
router.get("/room/:room", redirect, controller.games.index);

// API Router
// Table Room
router.get("/api/v2/rooms", adminOnly, controller.api.all_room);
router.get("/api/v2/room/:room", adminOnly, controller.api.room);

// Table User
router.get("/api/v2/users", adminOnly, controller.api.all_user);
router.get("/api/v2/user/:id", adminOnly, controller.api.user);
router.put("/api/v2/user/edit/:id", adminOnly, controller.api.update_user);
router.delete("/api/v2/user/delete/:id", adminOnly, controller.api.delete_user);

// Games
router.post("/api/v2/auth/register", controller.api.register);
router.get("/api/v2/whoami", restrict, controller.api.whoami);
router.post("/api/v2/auth/login", loginToken, controller.api.login);
router.post("/api/v2/room/create", tokenCheck, controller.api.create_room);
router.post("/api/v2/room/:room/join", tokenCheck, controller.api.join);
router.post("/api/v2/room/:room/play", tokenCheck, controller.api.play);
router.get("/api/v2/room/:room/result", tokenCheck, controller.api.result);

module.exports = router;
