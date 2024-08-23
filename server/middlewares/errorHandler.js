module.exports = function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Internal server error";

  switch (err.name) {
    case "InvalidInput":
      status = 400;
      message = "email/password is required";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "Invalid Token":
      status = 401;
      message = "Unauthenticated";
      break;
    case "EmailIsRequired":
      status = 400;
      message = "email is required";
      break;
    case "PasswordIsRequired":
      status = 400;
      message = "password is required";
      break;
    case "EmailOrPasswordInvalid":
      status = 404;
      message = "email or password is invalid";
      break;
    case "dataClubNotcomplete":
      status = 400;
      message = "Data club not complete";
      break;
    case "unauthorized":
      status = 403;
      message = "Unauthorized";
      break;
    case "MyclubNotFound":
      status = 404;
      message = "Myclub not found";
      break;
    case "DataMyDreamClubNotComplete":
      status = 403;
      message = "Data MyDream Club Not complete";
      break;
    case "MyDreamClubNotFound":
      status = 404;
      message = "Data MyDream Club Not found";
      break;
    case "Promptisrequired":
      status = 404;
      message = "Prompt is required";
      break;
    case "PlayerNotFound":
      status = 404;
      message = "Player Not Found";
      break;
  }
  res.status(status).json({
    message,
  });
};
