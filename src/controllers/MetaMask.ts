import HDWalletProvider from "@truffle/hdwallet-provider";
import { Request, Response } from "express";
import Locals from "../providers/Locals";
import Web3 from "web3";
import Logger from "../providers/Logger";
import path from "path";
import fs from 'fs'
import axios from 'axios'
const token=JSON.parse(fs.readFileSync(path.resolve(__dirname, '../token.json') , 'utf8'))
class MetaMaskController{
    // To Get Transaction URL
    public static async getTransactionURL(req: Request, res: Response){
        try{
            const {signature}=req.body
            if(!signature){
                throw new Error('Signature Url Missing')
            }
            //TODO: Add Signature Execution
            return res.status(200).json({message: 'Success', transactionURL: `http://xyz.com/${signature.toString()}`})
        }catch(err){
            return res.status(500).json({message: 'Something Went Wrong', err: err.message})
        }
    }

    // Make Payment From Central Wallet To Specified Wallet
    public static async makePayment(req: Request, res: Response){
        try{
            const {wallet_address, amount}=req.body
            const provider = new HDWalletProvider(
                Locals.config().walletPvtKey,
                Locals.config().walletNetwork
              );
            const web = new Web3(provider);
            const tokenContract = new web.eth.Contract(token, Locals.config().tokenContractAddress);
            // Check if Transaction is allowed
            // const allowance=await tokenContract.methods.allowance(wallet_address, Locals.config().handlerAddress).call()
            // Logger.info(`Allowance is ${allowance}`)
            // if(allowance.toString()<amount.toString()+ "000000000000000000"){
            //     throw new Error(`User has not authorized tranfer of tokens of amount ${amount.toString()}`)
            // }
            const rep=await tokenContract.methods.balanceOf(Locals.config().handlerAddress).call()
            console.log('Rep is', rep)
            const buy = await tokenContract.methods.transfer(wallet_address,amount.toString() + "000000000000000000").send({from:Locals.config().handlerAddress})
            console.log('Response of Buy is', buy)
            // Logger.debug(`After Buying ${JSON.stringify(buy)}`)
            if(buy.status){
                return res.status(200).json({message: 'Tokens transfer Success', url: `${Locals.config().bscScan}${buy?.transactionHash}`})
            }else{
                throw new Error('Token Transfer Failed, try again later')
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({message: 'Something Went Wrong', err: err.message})
        }
    }
    //To Get Transaction History
    public static async getHistory(req: Request, res: Response){
        try{
            const {page, api_key,get_type}=req.query
            let {user_address}=req.query
            if(!page || !api_key || !get_type || !user_address || typeof(user_address)!=="string"){
                throw new Error('Missing Page or API Key')
            }
            user_address=user_address.toLowerCase();
            if(get_type!=='received' && get_type!=='sent'){
                throw new Error('Invalid Get Type, can be of received and sent only')
            }
            const response=await axios.get(`${Locals.config().bscGetUrlPrefix}api?module=account&action=tokentx&contractaddress=${Locals.config().tokenContractAddress}&address=${user_address}&page=${page}&startblock=0&endblock=999999999&sort=asc&apikey=${api_key}`)
            // console.log('Response data is', response.data)
            const foundResults= response.data.result
            // console.log('Found Result are', foundResults)
            const answer: any=[]
            for (const result of foundResults) {
                if(get_type==='received'&& result.to===user_address && result.from===Locals.config().handlerAddress.toLowerCase()){
                    console.log('Matched', result)
                    answer.push(result)
                }
                if(get_type==='sent' && result.from===user_address && result.to===Locals.config().handlerAddress.toLowerCase()){
                    answer.push(result)
                }
            }
            console.log('Result Data is', answer)
            return res.status(200).json({message: 'success', result: answer})
        }catch(err){
            return res.status(500).json({message: 'Something Went Wrong', err: err.message})
        }
    }
}   
export default MetaMaskController