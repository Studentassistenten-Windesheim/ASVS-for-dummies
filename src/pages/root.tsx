import { useCallback, useEffect, useState } from 'react';
import ASVSList from '../components/ASVSList';
import ASVSListFilter from '../components/ASVSListFilter';
import ASVSChapter from '../model/ASVSChapter';
import ASVSItem from '../model/ASVSItem';
import { asvsListItemsAPI } from '../api/ASVSApi';
import ASVSSearch from '../components/ASVSSearch';
import { debug } from 'util';
import { isModuleNamespaceObject } from 'util/types';
import ASVSPinnedItems from '../components/ASVSPinnedItems';

const Root = () => {
  const [AllAsvsItems, setAllAsvsItems] = useState<ASVSItem[]>([]);
  const [asvsItems, setAsvsItems] = useState<ASVSItem[]>([]);
  const [chapters, setChapters] = useState<ASVSChapter[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [levels, setLevels] = useState<{ [key: string]: boolean }>({
    level1: false,
    level2: false,
    level3: false,
  });
  const [showIncompleteOnly, setShowIncompleteOnly] = useState<boolean>();
  const [pinnedItems, setPinnedItems] = useState<ASVSItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const items = await asvsListItemsAPI();
      const localStorageItems = localStorage.getItem('pinned-items');
      const pinnedItems = localStorageItems
        ? JSON.parse(localStorageItems)
        : [];

      const chapters: ASVSChapter[] = Array.from(
        items.reduce((p: any, c: ASVSItem) => {
          p.add(c.chapter_name);
          return p;
        }, new Set())
      ).map((c: any) => {
        return new ASVSChapter(c);
      });
      setAllAsvsItems(items);
      setPinnedItems(pinnedItems);
      setAsvsItems(items);
      setChapters(chapters);
    };

    fetchData();
  }, []);

  const setChapterCheck = (chapterName: string) => {
    // Find the chapter that was clicked
    const chapter = chapters.find((c: ASVSChapter) => c.name === chapterName);
    if (chapter) {
      chapter.checked = !chapter.checked;
      // Force a new array to be created so that React will re-render the component
      setChapters([...chapters]);
    }
  };

  const setLevelCheck = (levelName: string) => {
    setLevels((prevState) => ({
      ...prevState,
      [levelName]: !prevState[levelName],
    }));
  };

  const setSearchInputCheck = (input: string) => {
    setSearchInput(input.toLowerCase());
  };

  const filteredASVSItems = useCallback(() => {
    const checkedChapters = chapters
      .filter((c: ASVSChapter) => c.checked)
      .map((c: ASVSChapter) => c.name);
    const levelFilter: boolean =
      levels.level1 || levels.level2 || levels.level3;

    return asvsItems
      .map((i: ASVSItem) => {
        i.show = true;
        if (levelFilter) {
          let shouldShow = false;

          if (levels.level1 && i.level1 !== '') shouldShow = true;
          if (levels.level2 && i.level2 !== '') shouldShow = true;
          if (levels.level3 && i.level3 !== '') shouldShow = true;
          i.show = shouldShow;
        }
        return i;
      })
      .map((i: ASVSItem) => {
        if (
          checkedChapters.length > 0 &&
          checkedChapters.indexOf(i.chapter_name) === -1
        ) {
          i.show = false;
        }
        return i;
      })
      .map((i: ASVSItem) => {
        if (showIncompleteOnly && i.completed) {
          i.show = false;
        }
        return i;
      })
      .map((i: ASVSItem) => {
        if (searchInput && i.show) {
          const shouldShow =
            i.req_id.toLowerCase().includes(searchInput) ||
            i.req_description.toLowerCase().includes(searchInput) ||
            i.section_id.toLowerCase().includes(searchInput) ||
            i.section_name.toLowerCase().includes(searchInput) ||
            i.chapter_name.toLowerCase().includes(searchInput) ||
            i.chapter_id.toLowerCase().includes(searchInput) ||
            i.quick_reference.toLowerCase().includes(searchInput);
          i.show = shouldShow;
        }
        return i;
      });
  }, [chapters, levels, asvsItems, searchInput]);

  function setItemStatus(itemId: string, completed: boolean): void {
    // Find the item that was clicked
    let asvsItem = asvsItems.find((item: ASVSItem) => item.req_id == itemId);
    if (asvsItem) {
      asvsItem.completed = completed;
    }
    asvsItem = pinnedItems.find((item: ASVSItem) => item.req_id == itemId);
    if (asvsItem) {
      asvsItem.completed = completed;
    }

    localStorage.setItem(itemId, JSON.stringify(completed));
    // Force a new array to be created so that React will re-render the component
    setAsvsItems([...asvsItems]);
  }

  function toggleShowIncompleteOnly(c: boolean): void {
    setShowIncompleteOnly(c);
    // Force a new array to be created so that React will re-render the component
    setAsvsItems([...asvsItems]);
  }

  function setPinStatus(itemId: string): void {
    const asvsItem = AllAsvsItems.find(
      (item: ASVSItem) => item.req_id === itemId
    );
    if (asvsItem) {
      setPinnedItems((prevPinnedItems) => {
        const isPinned = prevPinnedItems.some(
          (item) => item.req_id === asvsItem.req_id
        );
        let updatedPinnedItems = isPinned
          ? prevPinnedItems.filter((item) => item.req_id !== itemId)
          : [asvsItem, ...prevPinnedItems];
        updatedPinnedItems.sort((a, b) => {
          return a.req_id.localeCompare(b.req_id, undefined, { numeric: true });
        });
        localStorage.setItem(
          'pinned-items',
          JSON.stringify(updatedPinnedItems)
        );
        return updatedPinnedItems;
      });
    }
  }

  function unpinAll(): void {
    setPinnedItems([]);
    localStorage.setItem('pinned-items', JSON.stringify([]));
  }

  return (
    <>
      <h1>
        ASVS for Dummies <small>(ASVS 4.0)</small>
      </h1>
      <ASVSPinnedItems
        items={pinnedItems}
        setItemStatus={(i: string, c: boolean) => setItemStatus(i, c)}
        setPinStatus={(i: string) => setPinStatus(i)}
        unpinAll={() => unpinAll()}
      ></ASVSPinnedItems>
      <ASVSListFilter
        chapters={chapters}
        setChapterCheck={(c: string) => setChapterCheck(c)}
        setLevelCheck={(c: string) => setLevelCheck(c)}
        toggleShowIncompleteOnly={(c: boolean) => toggleShowIncompleteOnly(c)}
      />
      <ASVSList
        items={filteredASVSItems()}
        pinnedItems={pinnedItems}
        setItemStatus={(i: string, c: boolean) => setItemStatus(i, c)}
        setSearchInputCheck={(c: string) => setSearchInputCheck(c)}
        setPinStatus={(i: string) => setPinStatus(i)}
      ></ASVSList>
    </>
  );
};

export default Root;
