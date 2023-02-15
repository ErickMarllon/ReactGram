const { body } = require("express-validator");

// Validation rule for inserting a photo.
const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório.")
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres."),
    body("image").custom((value, { req }) => {
      if (!req.file) throw new Error("A imagem é obrigatória.");

      return true;
    }),
  ];
};

// Validation rule for updating a photo.
const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres."),
  ];
};
// Validation rule for commenting a photo
const commentValidation = () => {
  return [
    body("comment")
      .isString()
      .withMessage("O comentário é obrigatório")
      .isLength({ min: 1 })
      .withMessage("O título precisa ter no mínimo 1 caracteres."),
  ];
};
module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
