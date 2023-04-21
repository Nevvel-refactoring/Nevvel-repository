package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.entity.Tag;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
public class TagRepisotoryTest {

    @Autowired
    private TagRepository tagRepository;


    @Test
    void findByTagNameInTest() {


        Tag tag1 = new Tag(1L, "공포");
        Tag tag2 = new Tag(2L, "호러");
        tagRepository.saveAll(List.of(tag1, tag2));

        List<Tag> tags = tagRepository.findByTagNameIn(List.of("공포", "호러"));

        Assertions.assertThat(tags.get(0).getTagName()).isEqualTo("공포");
        Assertions.assertThat(tags.get(1).getTagName()).isEqualTo("호러");


    }
}
