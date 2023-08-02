import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Challenges } from './schemas/challenge.schema';
import { Model, Types } from 'mongoose';

/*
만들어야 하는 기능

챌린지 
생성, 수정, 삭제, 읽기(상세페이지, 목록들..  => 목록 보여줄 때는 검색이랑 필터링도 같이.)

초대 및 참가
(인원수 설정할 수 있으며, 설정한 인원수 만큼만 참여할 수 있도록 )
=> 여기에서 참가자들에 대한 데이터를처리

마감(조기 마감도 할 수 있으니깐. 보통은 인원수 다차면 마감처리 되도록)
공개여부 (비공개는 호스트가 초대를 보내야 참가 할 수 있음. 공개는 누구나 참가 할 수 있음)


호스트랑 참가 유저들은 일단은 임의의 값들이 들어가게,,
호스트는 토큰으로 넘어오는 user의 값을 넣으면 됨.


updateOne 관련은 하나의 템플릿 만들어서 쓸 수 있게 수정 해야 할듯.

*/

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenges.name) private challengesModel: Model<Challenges>,
  ) {}

  // 챌린지 생성
  async create(createChallengeDto: CreateChallengeDto) {
    const insertChallenge = {
        host: 'sdsdsss',
        ...createChallengeDto
    }

    const challenge = new this.challengesModel(insertChallenge);
    await challenge.save();
    return challenge;
  }

  // 챌린지 수정
  async update(id: string, updateChallengeDto: UpdateChallengeDto) {
    const _id = new Types.ObjectId(id);

    await this.challengesModel.updateOne(
      { _id }, 
      { $set: {
        title: updateChallengeDto.title,
        thumbnail: updateChallengeDto.thumbnail,
        content: updateChallengeDto.content,
        startDate: updateChallengeDto.startDate,
        endDate: updateChallengeDto.endDate
      }}
    );
  }

  // 챌린지 삭제
  async remove(id: string) {
    const _id = new Types.ObjectId(id);

    await this.challengesModel.updateOne(
      { _id },
      { $set: { isDeleted: true } }
    );
  }

  // 챌린지 공개 여부
  async updatePrivate(id: string, isPrivate: boolean) {
    const _id = new Types.ObjectId(id);

    await this.challengesModel.updateOne(
      { _id },
      { $set: { isPrivate } }
    );
  }

  // 챌린지 마감 여부
  async updateClosed(id: string, isClosed: boolean) {
    const _id = new Types.ObjectId(id);

    await this.challengesModel.updateOne(
      { _id },
      { $set: { isClosed } }
    );
  }

  // 챌린지 참가
  async joinChallenge(id: string, userId: string) {
    const _id = new Types.ObjectId(id);
    const challenge = await this.challengesModel.findOne({_id});

    const memberNum = challenge.memberNum;
    let members = challenge.members;
    let isClosed = challenge.isClosed;

    if(isClosed) { // 모집이 마감됐는지 파악
      console.log('모집이 마감된 챌린지 입니다.');
      // 에러 던져줄 예정
    }

    if(!members.includes(userId)) { // 이미 참여한 유저인지 파악

      members.push(userId);

      if(memberNum < members.length) { // 참가한 인원수가 참여할수 있는 인원수를 초과할 경우 에러 발생
        members.pop();
        console.log('최대 인원 수를 초과 했습니다.');
      }

      if(!isClosed && memberNum === members.length) { // 참여할 수 있는 인원 수와 참가한 인원수가 동일 하면 마감
        isClosed = true;
      }

      await this.challengesModel.updateOne(
        { _id },
        { $set: { members, isClosed } }
      );

    } else {
      console.log('이미 챌린지에 참여한 유저 입니다.')
    }
  }

  // 챌린지 참가 취소
  async unJoinChallenge(id: string, userId: string) {
    const _id = new Types.ObjectId(id);
    const challenge = await this.challengesModel.findOne({_id});

    const memberNum = challenge.memberNum;
    let members = challenge.members;
    let isClosed = challenge.isClosed;

    let index = members.indexOf(userId);

    if (index !== -1) {
      members.splice(index, 1);
    }

    if(isClosed && (memberNum > members.length)) {
      isClosed = false;
    }

    await this.challengesModel.updateOne(
      { _id },
      { $set: { members, isClosed } }
    );
  }

  // 챌린지 상세 페이지 조회
  async readChalleng(id: string) {
    const _id = new Types.ObjectId(id);
    const challenge = await this.challengesModel.findOne({_id});

    return challenge;
  }

  // 챌린지 목록 조회
  async readChallengs(page: number, limit: number) {
    const challenges = await this.challengesModel.find().skip(page).limit(limit);

    return challenges;
  }
}
