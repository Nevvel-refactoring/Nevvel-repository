package com.ssafy.novvel.util.scheduler;

import com.ssafy.novvel.episode.service.EpisodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EpisodeScheduler {

    private final EpisodeService episodeService;

//    @Async
    @Scheduled(cron = "0 0/30 * * * *", zone = "Asia/Seoul") // 30분 단위 예약
//    @Scheduled(cron = "0/60 * * * * ?", zone = "Asia/Seoul")
    public void publishEpisode() {
        episodeService.reservationPublished();
    }
}
