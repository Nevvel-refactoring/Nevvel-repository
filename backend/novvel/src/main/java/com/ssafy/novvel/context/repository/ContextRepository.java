package com.ssafy.novvel.context.repository;

import com.ssafy.novvel.context.entity.Context;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContextRepository extends MongoRepository<Context, ObjectId> {

}
