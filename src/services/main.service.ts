import playerModel from "./../models/player.model";
import adminModel from "./../models/admin.model";
import gamesModel from "./../models/games.model";
import learnToWriteMasterModel from "./../models/learnToWriteMaster.model";
import learnToWriteLevelModel from "../models/learnToWriteLevel.model";
import spellingQuestMasterModel from "./../models/spellingQuestMaster.model";
import spellingQuestLevelModel from "./../models/spellingQuestLevel.model";
import letterMatchWordsMasterModel from "./../models/letterMatchWordsMaster.model";
import letterMatchWordsLevelModel from "./../models/letterMatchWordsLevel.model";
import characterPuzzleMasterModel from "./../models/characterPuzzleMaster.model";
import characterPuzzleLevelModel from "./../models/characterPuzzleLevel.model";
import completeTheWordMasterModel from "./../models/completeTheWordMaster.model";
import completeTheWordLevelModel from "./../models/completeTheWordLevel.model";
import folderModel from "./../models/folder.model";
import fileModel from "./../models/file.model";
import leaderboardHistoryModel from "./../models/leaderboardHistory.model";
import wordChoiceMasterModel from "./../models/wordChoiceMaster.model";
import wordChoiceLevelModel from "./../models/wordChoiceLevel.model";

export default class MainService {
  public model: {
    player: typeof playerModel;
    admin: typeof adminModel;
    games: typeof gamesModel;
    learnToWriteMaster: typeof learnToWriteMasterModel;
    learnToWriteLevel: typeof learnToWriteLevelModel;
    spellingQuestMaster: typeof spellingQuestMasterModel;
    spellingQuestLevel: typeof spellingQuestLevelModel;
    letterMatchWordsMaster: typeof letterMatchWordsMasterModel;
    letterMatchWordsLevel: typeof letterMatchWordsLevelModel;
    characterPuzzleMaster: typeof characterPuzzleMasterModel;
    characterPuzzleLevel: typeof characterPuzzleLevelModel;
    completeTheWordMaster: typeof completeTheWordMasterModel;
    completeTheWordLevel: typeof completeTheWordLevelModel;
    folder: typeof folderModel;
    file: typeof fileModel;
    leaderboardHistory: typeof leaderboardHistoryModel;
    wordChoiceMaster: typeof wordChoiceMasterModel;
    wordChoiceLevel: typeof wordChoiceLevelModel;
  };

  constructor() {
    this.model = {
      player: playerModel,
      admin: adminModel,
      games: gamesModel,
      learnToWriteMaster: learnToWriteMasterModel,
      learnToWriteLevel: learnToWriteLevelModel,
      spellingQuestMaster: spellingQuestMasterModel,
      spellingQuestLevel: spellingQuestLevelModel,
      letterMatchWordsMaster: letterMatchWordsMasterModel,
      letterMatchWordsLevel: letterMatchWordsLevelModel,
      characterPuzzleMaster: characterPuzzleMasterModel,
      characterPuzzleLevel: characterPuzzleLevelModel,
      completeTheWordMaster: completeTheWordMasterModel,
      completeTheWordLevel: completeTheWordLevelModel,
      folder: folderModel,
      file: fileModel,
      leaderboardHistory: leaderboardHistoryModel,
      wordChoiceMaster: wordChoiceMasterModel,
      wordChoiceLevel: wordChoiceLevelModel,
    };
  }
}
