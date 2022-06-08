import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import {games, groupLevel, pattern,} from '@components/moks-data/moks-data-addHomeWork';
import Step from '@components/step/Step';
import TextEditor from '@components/text-editor/TextEditor';
import styles from './AddHomework.module.scss';
import appStore, {Roles} from "@app/stores/appStore";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {Navigate} from "react-router";
import Custom404 from "@pages/404.page";


const IndexPage = () => {
  const router = useRouter()
  // useEffect(()=>{
  //   if(appStore.role !== Roles.Teacher){
  //    router.push('/')
  //   }
  // },[])
  // const [count] = useState<number>(5); // State для отображения количества элементов на каждой странице
  return appStore.role !== Roles.Teacher ? <Custom404/> :(
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <div className={styles.homeWork}>
          <h1>Домашнее задание</h1>
          <div className={styles.level}>
            <InformationItem
              title={'Уровень группы*'}
              variant={'select'}
              option={groupLevel}
              placeholder={'Младшая'}
            />
          </div>
          <div className={styles.editorWrapper}>
            <h3>Описание</h3>
            <TextEditor />
          </div>
        </div>
        <div className={styles.sample}>
          <div className={styles.sampleChoice}>
            <div className={styles.sampleBlock}>
              <InformationItem
                title={'Игра'}
                variant={'select'}
                option={games}
                placeholder={'Память и ритм'}
              />
              <InformationItem
                title={'Шаблон'}
                variant={'select'}
                option={pattern}
                placeholder={'Память и ритм'}
              />
            </div>
            <div className={styles.sampleBlock}>
              <InformationItem
                title={'Игра'}
                variant={'select'}
                option={games}
                placeholder={'Память и ритм'}
              />
              <InformationItem
                title={'Шаблон'}
                variant={'select'}
                option={pattern}
                placeholder={'Память и ритм'}
              />
            </div>
          </div>
          <div className={styles.sampleChoice}>
            <div className={styles.sampleBlock}>
              <InformationItem
                title={'Игра'}
                variant={'select'}
                option={games}
                placeholder={'Память и ритм'}
              />
              <InformationItem
                title={'Шаблон'}
                variant={'select'}
                option={pattern}
                placeholder={'Память и ритм'}
              />
            </div>
            <div className={`${styles.sampleBlock} ${styles.sampleAdd}`}>
              <div>
                <button onClick={() => console.log('заглушка')}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeBtn}>
        <CustomButton>Сохранить</CustomButton>
        <div>
          <Step countStep={7} />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
