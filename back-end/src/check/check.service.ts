import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Check } from 'src/schemas/Check.schema';
import { AddCheckDto } from './dto/AddCheck.dto';
import { UpdateCheckDto } from './dto/UpdateCheck.dto';
import { User } from 'src/schemas/User.schema';
import { ExpressRequest } from 'src/middlewares/auth.middleware';
import { Client } from 'src/schemas/Client.schema';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class CheckService {
  constructor(
    @InjectModel('check') private checkModel: Model<Check>,

    @InjectModel('user') private userModel: Model<User>,
    @InjectModel('client') private clientModel: Model<Client>,
    private readonly emailService: EmailService,
  ) {}

  getAllChecks() {
    return this.checkModel.find();
  }

  getCheckById(id: string) {
    return this.checkModel.findById(id);
  }
  async addCheck({ /* userId,clientId, */ ...addCheckDto }: AddCheckDto) {
    const check = await this.checkModel.findOne({
      CheckNumber: addCheckDto.CheckNumber,
    });
    if (check) {
      throw new HttpException(
        'Check number already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    /* const findUser = await this.userModel.findById(userId);
    if (!findUser) throw new HttpException('user not found', 404);
    const findClient = await this.clientModel.findById(clientId);
    if (!findClient) throw new HttpException('client not found', 404); */
    const newCheck = new this.checkModel(addCheckDto);
    const savedCheck = await newCheck.save();
    /*    await findUser.updateOne({
      $push: {
        checks: savedCheck._id,

      },
    });
    await findClient.updateOne({
      $push: {
        checks: savedCheck._id,
        
      },
    }); */
    return savedCheck;
  }
  async updateCheck(id: string, updateCheckDto: UpdateCheckDto) {
    return this.checkModel.findByIdAndUpdate(id, updateCheckDto);
  }
  deleteCheck(id: string) {
    return this.checkModel.findByIdAndDelete(id);
  }

  async findChecksForDeposit(daysBefore: number): Promise<Check[]> {
    // Calculate the date 3 days from now
    const theDate = new Date(Date());
    theDate.setDate(theDate.getDate() + daysBefore);

    console.log(theDate);
    //console.log(this.checkModel.find({depositDate: { $lte: theDate }}))
    const checksReadyForDeposite = this.checkModel
      .find({ DepositStatus: { $in: ['not deposited', 'pending'] }, DepositDate: { $lte: theDate } })
      .exec();
    //console.log('working');
    // Find checks due for deposit before the calculated date
    return checksReadyForDeposite;
  }
}
