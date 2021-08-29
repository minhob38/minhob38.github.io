---
title: "채팅 백엔드 설계"
categories: 
  - programming
date: 2021-08-04 01:00:00 +0900
last_modified_at: 2021-08-04 01:00:00 +0900
---

# 채팅 백엔드 설계

https://perfectacle.github.io/2018/04/13/key-algorithm/
https://fieldanimal.tistory.com/79




```
io.on('connection', socket => {
  socket.on('join-bookmark', async payload => {
    socket.join(boomarkId)
    const memos = await knex('memos').select('*')
    socket.emit('join-bookmark', memos)
  }
  socket.on('send-message', async payload => {
    const memo = await knex('memos')
        .insert({
            bookmark_id: boomarkId,
            author_id: authorId,
            contents: payload
        })
        .returning('*'
    io.in(boomarkId).emit('send-message', memo)
  }
  socket.on('leave-bookmark', payload => {
    socket.leave(boomarkId)
  }
  socket.on('disconnect', reason => {
    console.log(reason)
  })
})
```

chatting 방 입장 시, 소켓을 Room에 참여시킵니다. 또한, Database에서 이전 메세지를 가져옵니다.
메세지를 보내면 Database에 저장 후, 저장된 메세지를 보냅니다. (데이터베이스 저장 실패 시, 메세지를 보내지 않습니다,)
송신측도 데이터베이스 저장 성공시, 본인 화면에 본인 메세지가 보입니다.

## 참고자료
[• 채팅앱 소켓 설계1](https://adnan-tech.com/realtime-web-based-chat-in-node-js-mysql/)  
[• 채팅앱 소켓 설계2](https://javascript.plainenglish.io/how-to-build-a-websocket-chat-application-819399d55800)  
[• 채팅앱 소켓 설계3](https://www.freecodecamp.org/news/create-a-professional-node-express/)  
[• 채팅앱 소켓 설계3](https://www.youtube.com/watch?v=8Y6mWhcdSUM)
[• 채팅앱 데이터베이스 설계1](https://itectec.com/database/postgresql-chat-conversation-history-entity-relationship-diagram/)  
[• 채팅앱 아키텍처](https://engineering.linecorp.com/ko/blog/the-architecture-behind-chatting-on-line-live/)  


notification

https://towardsdatascience.com/designing-notification-system-with-message-queues-c30a2c9046de


service worker
https://www.youtube.com/watch?v=HlYFW2zaYQM

https://www.section.io/engineering-education/push-notification-in-nodejs-using-service-worker/

socket mern
https://www.youtube.com/watch?v=HggSXt1Hzfk
