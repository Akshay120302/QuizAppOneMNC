import Quiz from "../Modals/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createQuiz = async (req, res, next) => {
  try {
    const { title, questions } = req.body;

    // Validate the request body
    if (!title || !questions || !Array.isArray(questions)) {
      return next(errorHandler(400, "Invalid request body"));
    }

    const quiz = await Quiz.create(req.body);
    return res.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    return next(errorHandler(404, "Quiz not found!"));
  }

  if (req.user.id !== quiz.userRef) {
    return next(errorHandler(401, "You can only delete your own Quizs!"));
  }

  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.status(200).json("Quiz has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    return next(errorHandler(404, "Quiz not found!"));
  }
  if (req.user.id !== quiz.userRef) {
    return next(errorHandler(401, "You can only update your own Quizs!"));
  }

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedQuiz);
  } catch (error) {
    next(error);
  }
};

export const getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return next(errorHandler(404, "Quiz not found!"));
    }
    res.status(200).json(quiz);
  } catch (error) {
    next(error);
  }
};

export const getQuizzes = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.title || ""; // Use req.query.title instead of req.query.searchTerm

    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const quizzes = await Quiz.find({
      title: { $regex: searchTerm, $options: "i" },
    }).sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

    return res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
};
