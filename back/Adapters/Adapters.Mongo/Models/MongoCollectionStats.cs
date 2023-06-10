// Root myDeserializedClass = JsonSerializer.Deserialize<Root>(myJsonResponse);

using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace BackupMaker.Api.Adapters.Mongo.Models;

[BsonIgnoreExtraElements]
public record BlockManager(
	[property: JsonPropertyName("allocations requiring file extension")]
	double AllocationsRequiringFileExtension,
	[property: JsonPropertyName("blocks allocated")]
	double BlocksAllocated,
	[property: JsonPropertyName("blocks freed")]
	double BlocksFreed,
	[property: JsonPropertyName("checkpoint size")]
	double CheckpointSize,
	[property: JsonPropertyName("file allocation unit size")]
	double FileAllocationUnitSize,
	[property: JsonPropertyName("file bytes available for reuse")]
	double FileBytesAvailableForReuse,
	[property: JsonPropertyName("file magic number")]
	double FileMagicNumber,
	[property: JsonPropertyName("file major version number")]
	double FileMajorVersionNumber,
	[property: JsonPropertyName("file size in bytes")]
	double FileSizeInBytes,
	[property: JsonPropertyName("minor version number")]
	double MinorVersionNumber
);

[BsonIgnoreExtraElements]
public record Btree(
	[property: JsonPropertyName("btree checkpoint generation")]
	double BtreeCheckpointGeneration,
	[property: JsonPropertyName("btree clean tree checkpoint expiration time")]
	long BtreeCleanTreeCheckpointExpirationTime,
	[property: JsonPropertyName("btree compact pages reviewed")]
	double BtreeCompactPagesReviewed,
	[property: JsonPropertyName("btree compact pages selected to be rewritten")]
	double BtreeCompactPagesSelectedToBeRewritten,
	[property: JsonPropertyName("btree compact pages skipped")]
	double BtreeCompactPagesSkipped,
	[property: JsonPropertyName("btree skipped by compaction as process would not reduce size")]
	double BtreeSkippedByCompactionAsProcessWouldNotReduceSize,
	[property: JsonPropertyName("column-store fixed-size leaf pages")]
	double ColumnStoreFixedSizeLeafPages,
	[property: JsonPropertyName("column-store internal pages")]
	double ColumnStoreInternalPages,
	[property: JsonPropertyName("column-store variable-size RLE encoded values")]
	double ColumnStoreVariableSizeRLEEncodedValues,
	[property: JsonPropertyName("column-store variable-size deleted values")]
	double ColumnStoreVariableSizeDeletedValues,
	[property: JsonPropertyName("column-store variable-size leaf pages")]
	double ColumnStoreVariableSizeLeafPages,
	[property: JsonPropertyName("fixed-record size")]
	double FixedRecordSize,
	[property: JsonPropertyName("maximum internal page key size")]
	double MaximumInternalPageKeySize,
	[property: JsonPropertyName("maximum internal page size")]
	double MaximumInternalPageSize,
	[property: JsonPropertyName("maximum leaf page key size")]
	double MaximumLeafPageKeySize,
	[property: JsonPropertyName("maximum leaf page size")]
	double MaximumLeafPageSize,
	[property: JsonPropertyName("maximum leaf page value size")]
	double MaximumLeafPageValueSize,
	[property: JsonPropertyName("maximum tree depth")]
	double MaximumTreeDepth,
	[property: JsonPropertyName("number of key/value pairs")]
	double NumberOfKeyValuePairs,
	[property: JsonPropertyName("overflow pages")]
	double OverflowPages,
	[property: JsonPropertyName("pages rewritten by compaction")]
	double PagesRewrittenByCompaction,
	[property: JsonPropertyName("row-store empty values")]
	double RowStoreEmptyValues,
	[property: JsonPropertyName("row-store internal pages")]
	double RowStoreInternalPages,
	[property: JsonPropertyName("row-store leaf pages")]
	double RowStoreLeafPages
);

[BsonIgnoreExtraElements]
public record Cache(
	[property: JsonPropertyName("bytes currently in the cache")]
	double BytesCurrentlyInTheCache,
	[property: JsonPropertyName("bytes dirty in the cache cumulative")]
	double BytesDirtyInTheCacheCumulative,
	[property: JsonPropertyName("bytes read into cache")]
	double BytesReadIntoCache,
	[property: JsonPropertyName("bytes written from cache")]
	double BytesWrittenFromCache,
	[property: JsonPropertyName("checkpoint blocked page eviction")]
	double CheckpointBlockedPageEviction,
	[property: JsonPropertyName("checkpoint of history store file blocked non-history store page eviction")]
	double CheckpointOfHistoryStoreFileBlockedNonHistoryStorePageEviction,
	[property: JsonPropertyName("data source pages selected for eviction unable to be evicted")]
	double DataSourcePagesSelectedForEvictionUnableToBeEvicted,
	[property: JsonPropertyName("eviction gave up due to detecting an out of order on disk value behind the last update on the chain")]
	double EvictionGaveUpDueToDetectingAnOutOfOrderOnDiskValueBehindTheLastUpdateOnTheChain,
	[property: JsonPropertyName("eviction gave up due to detecting an out of order tombstone ahead of the selected on disk update")]
	double EvictionGaveUpDueToDetectingAnOutOfOrderTombstoneAheadOfTheSelectedOnDiskUpdate,
	[property: JsonPropertyName("eviction gave up due to detecting an out of order tombstone ahead of the selected on disk update after validating the update chain")]
	double EvictionGaveUpDueToDetectingAnOutOfOrderTombstoneAheadOfTheSelectedOnDiskUpdateAfterValidatingTheUpdateChain,
	[property: JsonPropertyName("eviction gave up due to detecting out of order timestamps on the update chain after the selected on disk update")]
	double EvictionGaveUpDueToDetectingOutOfOrderTimestampsOnTheUpdateChainAfterTheSelectedOnDiskUpdate,
	[property: JsonPropertyName("eviction walk passes of a file")]
	double EvictionWalkPassesOfAFile,
	[property: JsonPropertyName("eviction walk target pages histogram - 0-9")]
	double EvictionWalkTargetPagesHistogram09,
	[property: JsonPropertyName("eviction walk target pages histogram - 10-31")]
	double EvictionWalkTargetPagesHistogram1031,
	[property: JsonPropertyName("eviction walk target pages histogram - 128 and higher")]
	double EvictionWalkTargetPagesHistogram128AndHigher,
	[property: JsonPropertyName("eviction walk target pages histogram - 32-63")]
	double EvictionWalkTargetPagesHistogram3263,
	[property: JsonPropertyName("eviction walk target pages histogram - 64-128")]
	double EvictionWalkTargetPagesHistogram64128,
	[property: JsonPropertyName("eviction walk target pages reduced due to history store cache pressure")]
	double EvictionWalkTargetPagesReducedDueToHistoryStoreCachePressure,
	[property: JsonPropertyName("eviction walks abandoned")]
	double EvictionWalksAbandoned,
	[property: JsonPropertyName("eviction walks gave up because they restarted their walk twice")]
	double EvictionWalksGaveUpBecauseTheyRestartedTheirWalkTwice,
	[property: JsonPropertyName("eviction walks gave up because they saw too many pages and found no candidates")]
	double EvictionWalksGaveUpBecauseTheySawTooManyPagesAndFoundNoCandidates,
	[property: JsonPropertyName("eviction walks gave up because they saw too many pages and found too few candidates")]
	double EvictionWalksGaveUpBecauseTheySawTooManyPagesAndFoundTooFewCandidates,
	[property: JsonPropertyName("eviction walks reached end of tree")]
	double EvictionWalksReachedEndOfTree,
	[property: JsonPropertyName("eviction walks restarted")]
	double EvictionWalksRestarted,
	[property: JsonPropertyName("eviction walks started from root of tree")]
	double EvictionWalksStartedFromRootOfTree,
	[property: JsonPropertyName("eviction walks started from saved location in tree")]
	double EvictionWalksStartedFromSavedLocationInTree,
	[property: JsonPropertyName("hazard pointer blocked page eviction")]
	double HazardPointerBlockedPageEviction,
	[property: JsonPropertyName("history store table insert calls")]
	double HistoryStoreTableInsertCalls,
	[property: JsonPropertyName("history store table insert calls that returned restart")]
	double HistoryStoreTableInsertCallsThatReturnedRestart,
	[property: JsonPropertyName("history store table out-of-order resolved updates that lose their durable timestamp")]
	double HistoryStoreTableOutOfOrderResolvedUpdatesThatLoseTheirDurableTimestamp,
	[property: JsonPropertyName("history store table out-of-order updates that were fixed up by reinserting with the fixed timestamp")]
	double HistoryStoreTableOutOfOrderUpdatesThatWereFixedUpByReinsertingWithTheFixedTimestamp,
	[property: JsonPropertyName("history store table reads")]
	double HistoryStoreTableReads,
	[property: JsonPropertyName("history store table reads missed")]
	double HistoryStoreTableReadsMissed,
	[property: JsonPropertyName("history store table reads requiring squashed modifies")]
	double HistoryStoreTableReadsRequiringSquashedModifies,
	[property: JsonPropertyName("history store table truncation by rollback to stable to remove an unstable update")]
	double HistoryStoreTableTruncationByRollbackToStableToRemoveAnUnstableUpdate,
	[property: JsonPropertyName("history store table truncation by rollback to stable to remove an update")]
	double HistoryStoreTableTruncationByRollbackToStableToRemoveAnUpdate,
	[property: JsonPropertyName("history store table truncation to remove an update")]
	double HistoryStoreTableTruncationToRemoveAnUpdate,
	[property: JsonPropertyName("history store table truncation to remove range of updates due to key being removed from the data page during reconciliation")]
	double HistoryStoreTableTruncationToRemoveRangeOfUpdatesDueToKeyBeingRemovedFromTheDataPageDuringReconciliation,
	[property: JsonPropertyName("history store table truncation to remove range of updates due to out-of-order timestamp update on data page")]
	double HistoryStoreTableTruncationToRemoveRangeOfUpdatesDueToOutOfOrderTimestampUpdateOnDataPage,
	[property: JsonPropertyName("history store table writes requiring squashed modifies")]
	double HistoryStoreTableWritesRequiringSquashedModifies,
	[property: JsonPropertyName("in-memory page passed criteria to be split")]
	double InMemoryPagePassedCriteriaToBeSplit,
	[property: JsonPropertyName("in-memory page splits")]
	double InMemoryPageSplits,
	[property: JsonPropertyName("internal pages evicted")]
	double InternalPagesEvicted,
	[property: JsonPropertyName("internal pages split during eviction")]
	double InternalPagesSplitDuringEviction,
	[property: JsonPropertyName("leaf pages split during eviction")]
	double LeafPagesSplitDuringEviction,
	[property: JsonPropertyName("modified pages evicted")]
	double ModifiedPagesEvicted,
	[property: JsonPropertyName("overflow pages read into cache")]
	double OverflowPagesReadIntoCache,
	[property: JsonPropertyName("page split during eviction deepened the tree")]
	double PageSplitDuringEvictionDeepenedTheTree,
	[property: JsonPropertyName("page written requiring history store records")]
	double PageWrittenRequiringHistoryStoreRecords,
	[property: JsonPropertyName("pages read into cache")]
	double PagesReadIntoCache,
	[property: JsonPropertyName("pages read into cache after truncate")]
	double PagesReadIntoCacheAfterTruncate,
	[property: JsonPropertyName("pages read into cache after truncate in prepare state")]
	double PagesReadIntoCacheAfterTruncateInPrepareState,
	[property: JsonPropertyName("pages requested from the cache")]
	double PagesRequestedFromTheCache,
	[property: JsonPropertyName("pages seen by eviction walk")]
	double PagesSeenByEvictionWalk,
	[property: JsonPropertyName("pages written from cache")]
	double PagesWrittenFromCache,
	[property: JsonPropertyName("pages written requiring in-memory restoration")]
	double PagesWrittenRequiringInMemoryRestoration,
	[property: JsonPropertyName("the number of times full update inserted to history store")]
	double TheNumberOfTimesFullUpdateInsertedToHistoryStore,
	[property: JsonPropertyName("the number of times reverse modify inserted to history store")]
	double TheNumberOfTimesReverseModifyInsertedToHistoryStore,
	[property: JsonPropertyName("tracked dirty bytes in the cache")]
	double TrackedDirtyBytesInTheCache,
	[property: JsonPropertyName("unmodified pages evicted")]
	double UnmodifiedPagesEvicted
);

[BsonIgnoreExtraElements]
public record CacheWalk(
	[property: JsonPropertyName("Average difference between current eviction generation when the page was last considered")]
	double AverageDifferenceBetweenCurrentEvictionGenerationWhenThePageWasLastConsidered,
	[property: JsonPropertyName("Average on-disk page image size seen")]
	double AverageOnDiskPageImageSizeSeen,
	[property: JsonPropertyName("Average time in cache for pages that have been visited by the eviction server")]
	double AverageTimeInCacheForPagesThatHaveBeenVisitedByTheEvictionServer,
	[property: JsonPropertyName("Average time in cache for pages that have not been visited by the eviction server")]
	double AverageTimeInCacheForPagesThatHaveNotBeenVisitedByTheEvictionServer,
	[property: JsonPropertyName("Clean pages currently in cache")]
	double CleanPagesCurrentlyInCache,
	[property: JsonPropertyName("Current eviction generation")]
	double CurrentEvictionGeneration,
	[property: JsonPropertyName("Dirty pages currently in cache")]
	double DirtyPagesCurrentlyInCache,
	[property: JsonPropertyName("Entries in the root page")]
	double EntriesInTheRootPage,
	[property: JsonPropertyName("Internal pages currently in cache")]
	double InternalPagesCurrentlyInCache,
	[property: JsonPropertyName("Leaf pages currently in cache")]
	double LeafPagesCurrentlyInCache,
	[property: JsonPropertyName("Maximum difference between current eviction generation when the page was last considered")]
	double MaximumDifferenceBetweenCurrentEvictionGenerationWhenThePageWasLastConsidered,
	[property: JsonPropertyName("Maximum page size seen")]
	double MaximumPageSizeSeen,
	[property: JsonPropertyName("Minimum on-disk page image size seen")]
	double MinimumOnDiskPageImageSizeSeen,
	[property: JsonPropertyName("Number of pages never visited by eviction server")]
	double NumberOfPagesNeverVisitedByEvictionServer,
	[property: JsonPropertyName("On-disk page image sizes smaller than a single allocation unit")]
	double OnDiskPageImageSizesSmallerThanASingleAllocationUnit,
	[property: JsonPropertyName("Pages created in memory and never written")]
	double PagesCreatedInMemoryAndNeverWritten,
	[property: JsonPropertyName("Pages currently queued for eviction")]
	double PagesCurrentlyQueuedForEviction,
	[property: JsonPropertyName("Pages that could not be queued for eviction")]
	double PagesThatCouldNotBeQueuedForEviction,
	[property: JsonPropertyName("Refs skipped during cache traversal")]
	double RefsSkippedDuringCacheTraversal,
	[property: JsonPropertyName("Size of the root page")]
	double SizeOfTheRootPage,
	[property: JsonPropertyName("Total number of pages currently in cache")]
	double TotalNumberOfPagesCurrentlyInCache
);

[BsonIgnoreExtraElements]
public record CheckpointCleanup(
	[property: JsonPropertyName("pages added for eviction")]
	double PagesAddedForEviction,
	[property: JsonPropertyName("pages removed")]
	double PagesRemoved,
	[property: JsonPropertyName("pages skipped during tree walk")]
	double PagesSkippedDuringTreeWalk,
	[property: JsonPropertyName("pages visited")]
	double PagesVisited
);

[BsonIgnoreExtraElements]
public record ClusterTime(
	[property: JsonPropertyName("clusterTime")]
	DateTime ClusterTimeValue,
	[property: JsonPropertyName("signature")]
	Signature Signature
);

[BsonIgnoreExtraElements]
public record Compression(
	[property: JsonPropertyName("compressed page maximum internal page size prior to compression")]
	double CompressedPageMaximumInternalPageSizePriorToCompression,
	[property: JsonPropertyName("compressed page maximum leaf page size prior to compression ")]
	double CompressedPageMaximumLeafPageSizePriorToCompression,
	[property: JsonPropertyName("compressed pages read")]
	double CompressedPagesRead,
	[property: JsonPropertyName("compressed pages written")]
	double CompressedPagesWritten,
	[property: JsonPropertyName("page written failed to compress")]
	double PageWrittenFailedToCompress,
	[property: JsonPropertyName("page written was too small to compress")]
	double PageWrittenWasTooSmallToCompress
);

[BsonIgnoreExtraElements]
public record Cursor(
	[property: JsonPropertyName("Total number of entries skipped by cursor next calls")]
	double TotalNumberOfEntriesSkippedByCursorNextCalls,
	[property: JsonPropertyName("Total number of entries skipped by cursor prev calls")]
	double TotalNumberOfEntriesSkippedByCursorPrevCalls,
	[property: JsonPropertyName("Total number of entries skipped to position the history store cursor")]
	double TotalNumberOfEntriesSkippedToPositionTheHistoryStoreCursor,
	[property: JsonPropertyName("Total number of times a search near has exited due to prefix config")]
	double TotalNumberOfTimesASearchNearHasExitedDueToPrefixConfig,
	[property: JsonPropertyName("bulk loaded cursor insert calls")]
	double BulkLoadedCursorInsertCalls,
	[property: JsonPropertyName("cache cursors reuse count")]
	double CacheCursorsReuseCount,
	[property: JsonPropertyName("close calls that result in cache")]
	double CloseCallsThatResultInCache,
	[property: JsonPropertyName("create calls")]
	double CreateCalls,
	[property: JsonPropertyName("cursor next calls that skip due to a globally visible history store tombstone")]
	double CursorNextCallsThatSkipDueToAGloballyVisibleHistoryStoreTombstone,
	[property: JsonPropertyName("cursor next calls that skip greater than or equal to 100 entries")]
	double CursorNextCallsThatSkipGreaterThanOrEqualTo100Entries,
	[property: JsonPropertyName("cursor next calls that skip less than 100 entries")]
	double CursorNextCallsThatSkipLessThan100Entries,
	[property: JsonPropertyName("cursor prev calls that skip due to a globally visible history store tombstone")]
	double CursorPrevCallsThatSkipDueToAGloballyVisibleHistoryStoreTombstone,
	[property: JsonPropertyName("cursor prev calls that skip greater than or equal to 100 entries")]
	double CursorPrevCallsThatSkipGreaterThanOrEqualTo100Entries,
	[property: JsonPropertyName("cursor prev calls that skip less than 100 entries")]
	double CursorPrevCallsThatSkipLessThan100Entries,
	[property: JsonPropertyName("insert calls")]
	double InsertCalls,
	[property: JsonPropertyName("insert key and value bytes")]
	double InsertKeyAndValueBytes,
	[property: JsonPropertyName("modify")] double Modify,
	[property: JsonPropertyName("modify key and value bytes affected")]
	double ModifyKeyAndValueBytesAffected,
	[property: JsonPropertyName("modify value bytes modified")]
	double ModifyValueBytesModified,
	[property: JsonPropertyName("next calls")]
	double NextCalls,
	[property: JsonPropertyName("open cursor count")]
	double OpenCursorCount,
	[property: JsonPropertyName("operation restarted")]
	double OperationRestarted,
	[property: JsonPropertyName("prev calls")]
	double PrevCalls,
	[property: JsonPropertyName("remove calls")]
	double RemoveCalls,
	[property: JsonPropertyName("remove key bytes removed")]
	double RemoveKeyBytesRemoved,
	[property: JsonPropertyName("reserve calls")]
	double ReserveCalls,
	[property: JsonPropertyName("reset calls")]
	double ResetCalls,
	[property: JsonPropertyName("search calls")]
	double SearchCalls,
	[property: JsonPropertyName("search history store calls")]
	double SearchHistoryStoreCalls,
	[property: JsonPropertyName("search near calls")]
	double SearchNearCalls,
	[property: JsonPropertyName("truncate calls")]
	double TruncateCalls,
	[property: JsonPropertyName("update calls")]
	double UpdateCalls,
	[property: JsonPropertyName("update key and value bytes")]
	double UpdateKeyAndValueBytes,
	[property: JsonPropertyName("update value size change")]
	double UpdateValueSizeChange
);

[BsonIgnoreExtraElements]
public record Id(
	[property: JsonPropertyName("metadata")]
	Metadata Metadata,
	[property: JsonPropertyName("creationString")]
	string CreationString,
	[property: JsonPropertyName("type")] string Type,
	[property: JsonPropertyName("uri")] string Uri,
	[property: JsonPropertyName("LSM")] LSM LSM,
	[property: JsonPropertyName("block-manager")]
	BlockManager BlockManager,
	[property: JsonPropertyName("btree")] Btree Btree,
	[property: JsonPropertyName("cache")] Cache Cache,
	[property: JsonPropertyName("cache_walk")]
	CacheWalk CacheWalk,
	[property: JsonPropertyName("checkpoint-cleanup")]
	CheckpointCleanup CheckpointCleanup,
	[property: JsonPropertyName("compression")]
	Compression Compression,
	[property: JsonPropertyName("cursor")] Cursor Cursor,
	[property: JsonPropertyName("reconciliation")]
	Reconciliation Reconciliation,
	[property: JsonPropertyName("session")]
	Session Session,
	[property: JsonPropertyName("transaction")]
	Transaction Transaction
);

[BsonIgnoreExtraElements]
public record IndexDetails(
	[property: JsonPropertyName("_id_")] Id Id
);



[BsonIgnoreExtraElements]
public record LSM(
	[property: JsonPropertyName("bloom filter false positives")]
	double BloomFilterFalsePositives,
	[property: JsonPropertyName("bloom filter hits")]
	double BloomFilterHits,
	[property: JsonPropertyName("bloom filter misses")]
	double BloomFilterMisses,
	[property: JsonPropertyName("bloom filter pages evicted from cache")]
	double BloomFilterPagesEvictedFromCache,
	[property: JsonPropertyName("bloom filter pages read into cache")]
	double BloomFilterPagesReadIntoCache,
	[property: JsonPropertyName("bloom filters in the LSM tree")]
	double BloomFiltersInTheLSMTree,
	[property: JsonPropertyName("chunks in the LSM tree")]
	double ChunksInTheLSMTree,
	[property: JsonPropertyName("highest merge generation in the LSM tree")]
	double HighestMergeGenerationInTheLSMTree,
	[property: JsonPropertyName("queries that could have benefited from a Bloom filter that did not exist")]
	double QueriesThatCouldHaveBenefitedFromABloomFilterThatDidNotExist,
	[property: JsonPropertyName("sleep for LSM checkpoint throttle")]
	double SleepForLSMCheckpointThrottle,
	[property: JsonPropertyName("sleep for LSM merge throttle")]
	double SleepForLSMMergeThrottle,
	[property: JsonPropertyName("total size of bloom filters")]
	double TotalSizeOfBloomFilters
);

[BsonIgnoreExtraElements]
public record Metadata(
	[property: JsonPropertyName("formatVersion")]
	double FormatVersion
);

[BsonIgnoreExtraElements]
public record Reconciliation(
	[property: JsonPropertyName("approximate byte size of timestamps in pages written")]
	double ApproximateByteSizeOfTimestampsInPagesWritten,
	[property: JsonPropertyName("approximate byte size of transaction IDs in pages written")]
	double ApproximateByteSizeOfTransactionIDsInPagesWritten,
	[property: JsonPropertyName("dictionary matches")]
	double DictionaryMatches,
	[property: JsonPropertyName("fast-path pages deleted")]
	double FastPathPagesDeleted,
	[property: JsonPropertyName("internal page key bytes discarded using suffix compression")]
	double InternalPageKeyBytesDiscardedUsingSuffixCompression,
	[property: JsonPropertyName("internal page multi-block writes")]
	double InternalPageMultiBlockWrites,
	[property: JsonPropertyName("internal-page overflow keys")]
	double InternalPageOverflowKeys,
	[property: JsonPropertyName("leaf page key bytes discarded using prefix compression")]
	double LeafPageKeyBytesDiscardedUsingPrefixCompression,
	[property: JsonPropertyName("leaf page multi-block writes")]
	double LeafPageMultiBlockWrites,
	[property: JsonPropertyName("leaf-page overflow keys")]
	double LeafPageOverflowKeys,
	[property: JsonPropertyName("maximum blocks required for a page")]
	double MaximumBlocksRequiredForAPage,
	[property: JsonPropertyName("overflow values written")]
	double OverflowValuesWritten,
	[property: JsonPropertyName("page checksum matches")]
	double PageChecksumMatches,
	[property: JsonPropertyName("page reconciliation calls")]
	double PageReconciliationCalls,
	[property: JsonPropertyName("page reconciliation calls for eviction")]
	double PageReconciliationCallsForEviction,
	[property: JsonPropertyName("pages deleted")]
	double PagesDeleted,
	[property: JsonPropertyName("pages written including an aggregated newest start durable timestamp ")]
	double PagesWrittenIncludingAnAggregatedNewestStartDurableTimestamp,
	[property: JsonPropertyName("pages written including an aggregated newest stop durable timestamp ")]
	double PagesWrittenIncludingAnAggregatedNewestStopDurableTimestamp,
	[property: JsonPropertyName("pages written including an aggregated newest stop timestamp ")]
	double PagesWrittenIncludingAnAggregatedNewestStopTimestamp,
	[property: JsonPropertyName("pages written including an aggregated newest stop transaction ID")]
	double PagesWrittenIncludingAnAggregatedNewestStopTransactionID,
	[property: JsonPropertyName("pages written including an aggregated newest transaction ID ")]
	double PagesWrittenIncludingAnAggregatedNewestTransactionID,
	[property: JsonPropertyName("pages written including an aggregated oldest start timestamp ")]
	double PagesWrittenIncludingAnAggregatedOldestStartTimestamp,
	[property: JsonPropertyName("pages written including an aggregated prepare")]
	double PagesWrittenIncludingAnAggregatedPrepare,
	[property: JsonPropertyName("pages written including at least one prepare")]
	double PagesWrittenIncludingAtLeastOnePrepare,
	[property: JsonPropertyName("pages written including at least one start durable timestamp")]
	double PagesWrittenIncludingAtLeastOneStartDurableTimestamp,
	[property: JsonPropertyName("pages written including at least one start timestamp")]
	double PagesWrittenIncludingAtLeastOneStartTimestamp,
	[property: JsonPropertyName("pages written including at least one start transaction ID")]
	double PagesWrittenIncludingAtLeastOneStartTransactionID,
	[property: JsonPropertyName("pages written including at least one stop durable timestamp")]
	double PagesWrittenIncludingAtLeastOneStopDurableTimestamp,
	[property: JsonPropertyName("pages written including at least one stop timestamp")]
	double PagesWrittenIncludingAtLeastOneStopTimestamp,
	[property: JsonPropertyName("pages written including at least one stop transaction ID")]
	double PagesWrittenIncludingAtLeastOneStopTransactionID,
	[property: JsonPropertyName("records written including a prepare")]
	double RecordsWrittenIncludingAPrepare,
	[property: JsonPropertyName("records written including a start durable timestamp")]
	double RecordsWrittenIncludingAStartDurableTimestamp,
	[property: JsonPropertyName("records written including a start timestamp")]
	double RecordsWrittenIncludingAStartTimestamp,
	[property: JsonPropertyName("records written including a start transaction ID")]
	double RecordsWrittenIncludingAStartTransactionID,
	[property: JsonPropertyName("records written including a stop durable timestamp")]
	double RecordsWrittenIncludingAStopDurableTimestamp,
	[property: JsonPropertyName("records written including a stop timestamp")]
	double RecordsWrittenIncludingAStopTimestamp,
	[property: JsonPropertyName("records written including a stop transaction ID")]
	double RecordsWrittenIncludingAStopTransactionID
);

[BsonIgnoreExtraElements]
public record MongoCollectionStats(
	[property: JsonPropertyName("ns")] string Ns,
	[property: JsonPropertyName("size")] double Size,
	[property: JsonPropertyName("count")] double Count,
	[property: JsonPropertyName("avgObjSize")]
	double AvgObjSize,
	[property: JsonPropertyName("storageSize")]
	double StorageSize,
	[property: JsonPropertyName("freeStorageSize")]
	double FreeStorageSize,
	[property: JsonPropertyName("capped")] bool Capped,
	[property: JsonPropertyName("wiredTiger")]
	WiredTiger WiredTiger,
	[property: JsonPropertyName("nindexes")]
	double Nindexes,
	[property: JsonPropertyName("indexDetails")]
	Dictionary<string, double> IndexDetails,
	[property: JsonPropertyName("indexBuilds")]
	IReadOnlyList<object> IndexBuilds,
	[property: JsonPropertyName("totalIndexSize")]
	double TotalIndexSize,
	[property: JsonPropertyName("totalSize")]
	double TotalSize,
	[property: JsonPropertyName("indexSizes")]
	Dictionary<string, double> IndexSizes,
	[property: JsonPropertyName("scaleFactor")]
	double ScaleFactor,
	[property: JsonPropertyName("ok")] double Ok,
	[property: JsonPropertyName("$clusterTime")]
	ClusterTime ClusterTime,
	[property: JsonPropertyName("operationTime")]
	DateTime OperationTime
);

[BsonIgnoreExtraElements]
public record Session(
	[property: JsonPropertyName("object compaction")]
	double ObjectCompaction,
	[property: JsonPropertyName("tiered operations dequeued and processed")]
	double TieredOperationsDequeuedAndProcessed,
	[property: JsonPropertyName("tiered operations scheduled")]
	double TieredOperationsScheduled,
	[property: JsonPropertyName("tiered storage local retention time (secs)")]
	double TieredStorageLocalRetentionTimeSecs
);

[BsonIgnoreExtraElements]
public record Signature(
	[property: JsonPropertyName("hash")] string Hash,
	[property: JsonPropertyName("keyId")] long KeyId
);

[BsonIgnoreExtraElements]
public record Transaction(
	[property: JsonPropertyName("race to read prepared update retry")]
	double RaceToReadPreparedUpdateRetry,
	[property: JsonPropertyName("rollback to stable history store records with stop timestamps older than newer records")]
	double RollbackToStableHistoryStoreRecordsWithStopTimestampsOlderThanNewerRecords,
	[property: JsonPropertyName("rollback to stable inconsistent checkpoint")]
	double RollbackToStableInconsistentCheckpoint,
	[property: JsonPropertyName("rollback to stable keys removed")]
	double RollbackToStableKeysRemoved,
	[property: JsonPropertyName("rollback to stable keys restored")]
	double RollbackToStableKeysRestored,
	[property: JsonPropertyName("rollback to stable restored tombstones from history store")]
	double RollbackToStableRestoredTombstonesFromHistoryStore,
	[property: JsonPropertyName("rollback to stable restored updates from history store")]
	double RollbackToStableRestoredUpdatesFromHistoryStore,
	[property: JsonPropertyName("rollback to stable skipping delete rle")]
	double RollbackToStableSkippingDeleteRle,
	[property: JsonPropertyName("rollback to stable skipping stable rle")]
	double RollbackToStableSkippingStableRle,
	[property: JsonPropertyName("rollback to stable sweeping history store keys")]
	double RollbackToStableSweepingHistoryStoreKeys,
	[property: JsonPropertyName("rollback to stable updates removed from history store")]
	double RollbackToStableUpdatesRemovedFromHistoryStore,
	[property: JsonPropertyName("transaction checkpoints due to obsolete pages")]
	double TransactionCheckpointsDueToObsoletePages,
	[property: JsonPropertyName("update conflicts")]
	double UpdateConflicts
);

[BsonIgnoreExtraElements]
public record WiredTiger(
	[property: JsonPropertyName("metadata")]
	Metadata Metadata,
	[property: JsonPropertyName("creationString")]
	string CreationString,
	[property: JsonPropertyName("type")] string Type,
	[property: JsonPropertyName("uri")] string Uri,
	[property: JsonPropertyName("LSM")] LSM LSM,
	[property: JsonPropertyName("block-manager")]
	BlockManager BlockManager,
	[property: JsonPropertyName("btree")] Btree Btree,
	[property: JsonPropertyName("cache")] Cache Cache,
	[property: JsonPropertyName("cache_walk")]
	CacheWalk CacheWalk,
	[property: JsonPropertyName("checkpoint-cleanup")]
	CheckpointCleanup CheckpointCleanup,
	[property: JsonPropertyName("compression")]
	Compression Compression,
	[property: JsonPropertyName("cursor")] Cursor Cursor,
	[property: JsonPropertyName("reconciliation")]
	Reconciliation Reconciliation,
	[property: JsonPropertyName("session")]
	Session Session,
	[property: JsonPropertyName("transaction")]
	Transaction Transaction
);