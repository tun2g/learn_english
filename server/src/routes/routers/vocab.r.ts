import { Router } from "express";
import VocabController from "../../controllers/vocab.c"
import { VocabEntity } from "../../entitys/vocab";
import validateEntity from "../../middleware/validateEntity";
import authorize from "../../middleware/authorize";
const VolcabRouter = Router();

VolcabRouter.post(
    '/manage',
    validateEntity(VocabEntity),
    authorize(),
    VocabController.createNewVocab
);

VolcabRouter.put(
    '/manage',
    validateEntity(VocabEntity),
    authorize(),
    VocabController.updateVocab
)

export default VolcabRouter;