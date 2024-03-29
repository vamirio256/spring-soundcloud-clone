package com.zyan.backend.search;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/searchs")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public CompletableFuture<ResponseEntity<SearchResponseDTO>> search(@RequestParam String query) {
        return searchService.search(query)
                .thenApply(ResponseEntity::ok);
    }
}
