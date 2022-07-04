import { Request, Response } from 'express';
import { Controller } from './Controller';
import { accountsService } from '../services/accountsService';

class AccountsController extends Controller
{
    getAllAccounts (req: Request, res: Response)
    {
        this.callService(res, accountsService.getAllAccounts.bind(accountsService));
    }

    createAccount (req: Request, res: Response)
    {
        this.callService(res, accountsService.createAccount.bind(accountsService), req.body);
    }
}

const accountsController = new AccountsController();
export { accountsController };
