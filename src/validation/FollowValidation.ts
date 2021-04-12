import { body, ValidationChain } from "express-validator";

const GroupValidation = {
  follow: (): Array<ValidationChain> => [
    body("followee_id", "followee_id is required!").not().isEmpty(),
    body("public_key", "public_key is required!").not().isEmpty(),
    body("private_key", "private_key is required!").not().isEmpty(),
  ],
  approve: (): Array<ValidationChain> => [
    body("follow_id", "follow_id is required!").not().isEmpty(),
    body("sym_key", "sym_key is required!").not().isEmpty(),
    body("group_id", "group_id is required!").not().isEmpty(),
  ],
};

export default GroupValidation;