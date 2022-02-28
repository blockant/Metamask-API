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
                'sort island camera clay tiger miss sting light scheme quit bid model',
                'https://data-seed-prebsc-1-s1.binance.org:8545'
              );
            const web = new Web3(provider);
            const tokenContract = new web.eth.Contract(token, Locals.config().tokenContractAddress);
            // Check if Transaction is allowed
            // const allowance=await tokenContract.methods.allowance(wallet_address, Locals.config().handlerAddress).call()
            // Logger.info(`Allowance is ${allowance}`)
            // if(allowance.toString()<amount.toString()+ "000000000000000000"){
            //     throw new Error(`User has not authorized tranfer of tokens of amount ${amount.toString()}`)
            // }
            const buy = await tokenContract.methods.transfer(wallet_address,Locals.config().handlerAddress,amount.toString() + "000000000000000000").send({from:Locals.config().handlerAddress})
            console.log('Response of Buy is', buy)
            // Logger.debug(`After Buying ${JSON.stringify(buy)}`)
            if(buy.status){
                return res.status(200).json({message: 'Tokens transfer Success'})
            }else{
                throw new Error('Unable to create Bid')
            }
        }catch(err){
            return res.status(500).json({message: 'Something Went Wrong', err: err.message})
        }
    }
    //To Get Transaction History
    public static async getHistory(req: Request, res: Response){
        try{
            const {page, api_key, to_address, from_address, time}=req.query
            if(!page || !api_key){
                throw new Error('Missing Page or API Key')
            }
            const response=await axios.get(`https://api.bscscan.com/api ?module=account&action=tokentx&contractaddress=0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51&address=0x7bb89460599dbf32ee3aa50798bbceae2a5f7f6a&page=${page}&offset=5&startblock=0&endblock=999999999&sort=asc&apikey=${api_key}`)
            let foundResults= response.data.result
            foundResults=foundResults.map((item: any)=>{
                if(to_address && item.to===to_address){
                    return item
                }
                if(from_address && item.from===from_address){
                    return item
                }
                if(time){
                    let ms_now=Date.now()
                    ms_now=ms_now-Number(time)
                    if(item.timeStamp>=ms_now){
                        return item
                    }
                }
            })
            foundResults=foundResults.filter(function (el: any) {
                return el != null;
            });              
            console.log('Result Data is', foundResults)
            return res.status(200).json({message: 'success', result: foundResults})
        }catch(err){
            return res.status(500).json({message: 'Something Went Wrong', err: err.message})
        }
    }
}   
export default MetaMaskController