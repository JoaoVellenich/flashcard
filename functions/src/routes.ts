import { Router } from 'express'
import { createDeck, deleteDeck, getDeck, updateDeckInfo } from './controllers/deck/crud'
import{ createUser, getAllDecks } from './controllers/user/crud'
import{
    createFlashCard,
    getFlashCard,
} from './controllers/FlashCard/crud'



const router = Router()

router.post('/flashcard', getFlashCard)
router.post('/createFlashCard', createFlashCard)
router.put('/updateFlashCard', createFlashCard)
router.delete('/deleteFlashCard', createFlashCard)

router.post('/createUser', createUser)
router.post('/getDecksNames', getAllDecks)

router.post('/createDeck', createDeck)
router.post('/getDeck', getDeck)
router.delete('/deck', deleteDeck)
router.put('/deck', updateDeckInfo)

export default router
