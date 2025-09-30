import conf from "../conf/conf";
import { Client,ID, Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client
    databases;
    bucket;
    constructor(){
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId)
          this.databases = new Databases(client);
          this.bucket = new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
             return await this.databases.createDocument(
                conf.appwriteDataBaseId,
               conf.appwriteCollectionId,
               slug,
               {
                title,
                content,
                featuredImage,
                status,
                userId
               }
             )
        }catch(error){
           throw error
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }catch(error){
            throw error
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(error){
            throw error
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
       try{
         return await this.databases.listDocuments(
            conf.appwriteDataBaseId,
            appwriteCollectionId,
            queries,
         )
       }catch(error){
        console.log(error);
        
       }       
    }
    
    //file upload
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log(error);
            
        }
    }

    async deleteFile(fileID){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true
        }
        catch(error){
            console.log(error);   
        }
    }
    getfilePreview(fileID){
       return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileID
       )
    }

}

const service = new Service()
export default service