import { exec } from "./db";

/**
 * Fetch an article by name
 */
export const getArticle = async ( req, res ) => {
    const { name } = req.params;
    await exec( async db => {
        res
            .status( 200 )
            .send( await db
                .collection( "articles" )
                .findOne( { name } ) );
    } );
};

/**
 * Upvote an article
 */
export const upvoteArticle = async ( req, res ) => {
    const { name } = req.params;
    await exec( async db => {
        const record = await db
            .collection( "articles" )
            .findOne( { name } );
        await db
            .collection( "articles" )
            .updateOne( { name }, {
                $set: {
                    upvotes: record.upvotes + 1,
                },
            } );
        return res
            .status( 200 )
            .send( await db
                .collection( "articles" )
                .findOne( { name } ) );
    } );
};

/**
 * Add comments to an article
 */
export const addComment = async ( req, res ) => {
    const { name } = req.params;
    await exec( async db => {
        const record = await db
            .collection( "articles" )
            .findOne( { name } );
        await db
            .collection( "articles" )
            .updateOne( { name }, {
                $set: {
                    comments: [
                        ...record.comments,
                        req.body,
                    ],
                },
            } );
        return res
            .status( 200 )
            .send( await db
                .collection( "articles" )
                .findOne( { name } ) );
    } );
};
