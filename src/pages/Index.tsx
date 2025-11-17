import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Exercise {
  id: string;
  title: string;
  duration: number;
  category: 'eyes' | 'neck' | 'hands' | 'back';
  icon: string;
  description: string;
  steps?: string[];
  benefits?: string[];
}

const exercises: Exercise[] = [
  { 
    id: '1', 
    title: 'Круговые движения глазами', 
    duration: 60, 
    category: 'eyes', 
    icon: 'Eye', 
    description: '10 кругов по часовой, 10 против',
    steps: ['Сядьте прямо, расслабьте плечи', 'Смотрите вверх, затем медленно двигайте взгляд по кругу', 'Сделайте 10 кругов по часовой стрелке', 'Затем 10 кругов против часовой стрелки', 'Не двигайте головой, только глазами'],
    benefits: ['Снимает напряжение глазных мышц', 'Улучшает кровообращение', 'Предотвращает сухость глаз']
  },
  { 
    id: '2', 
    title: 'Правило 20-20-20', 
    duration: 20, 
    category: 'eyes', 
    icon: 'ScanEye', 
    description: 'Смотрите на объект в 20 футах 20 секунд',
    steps: ['Каждые 20 минут работы делайте перерыв', 'Найдите объект на расстоянии около 6 метров', 'Смотрите на него в течение 20 секунд', 'Моргайте естественно', 'Повторяйте регулярно'],
    benefits: ['Профилактика близорукости', 'Уменьшает усталость глаз', 'Помогает фокусировке']
  },
  { 
    id: '3', 
    title: 'Наклоны головы', 
    duration: 90, 
    category: 'neck', 
    icon: 'MoveVertical', 
    description: 'Влево-вправо, вперёд-назад',
    steps: ['Сядьте прямо, расслабьте плечи', 'Медленно наклоните голову к правому плечу', 'Задержитесь на 5 секунд', 'Повторите для левой стороны', 'Наклоните голову вперед к груди', 'Затем откиньте назад (осторожно)'],
    benefits: ['Снимает напряжение в шее', 'Улучшает гибкость', 'Уменьшает головную боль']
  },
  { 
    id: '4', 
    title: 'Вращения шеей', 
    duration: 60, 
    category: 'neck', 
    icon: 'RotateCcw', 
    description: 'Медленные круговые движения',
    steps: ['Выпрямите спину', 'Медленно поверните голову вправо', 'Опустите подбородок к груди', 'Поверните голову влево', 'Поднимите подбородок', 'Повторите 5 раз в каждую сторону'],
    benefits: ['Расслабляет мышцы шеи', 'Улучшает подвижность', 'Снижает риск защемлений']
  },
  { 
    id: '5', 
    title: 'Растяжка кистей', 
    duration: 60, 
    category: 'hands', 
    icon: 'Hand', 
    description: 'Сгибание и разгибание пальцев',
    steps: ['Вытяните руки перед собой', 'Сожмите кулаки на 5 секунд', 'Резко разожмите и растопырьте пальцы', 'Повторите 10 раз', 'Помассируйте каждый палец'],
    benefits: ['Предотвращает туннельный синдром', 'Улучшает кровообращение в руках', 'Снимает усталость от печатания']
  },
  { 
    id: '6', 
    title: 'Вращение запястий', 
    duration: 45, 
    category: 'hands', 
    icon: 'RefreshCw', 
    description: 'По часовой и против часовой',
    steps: ['Вытяните руки вперед', 'Вращайте запястьями по кругу', '10 раз по часовой стрелке', '10 раз против часовой', 'Потрясите руками для расслабления'],
    benefits: ['Снимает напряжение в запястьях', 'Профилактика туннельного синдрома', 'Улучшает гибкость']
  },
  { 
    id: '7', 
    title: 'Наклоны вперёд', 
    duration: 120, 
    category: 'back', 
    icon: 'MoveDown', 
    description: 'Тянитесь к носкам сидя',
    steps: ['Встаньте со стула', 'Медленно наклонитесь вперед', 'Тянитесь руками к полу', 'Не сгибайте колени сильно', 'Задержитесь на 10-15 секунд', 'Медленно выпрямитесь'],
    benefits: ['Растягивает позвоночник', 'Снимает напряжение в пояснице', 'Улучшает гибкость спины']
  },
  { 
    id: '8', 
    title: 'Скручивания', 
    duration: 90, 
    category: 'back', 
    icon: 'RotateCw', 
    description: 'Повороты корпуса на стуле',
    steps: ['Сядьте прямо на стул', 'Положите правую руку на левое колено', 'Поверните корпус влево', 'Задержитесь на 10 секунд', 'Повторите для другой стороны', 'Сделайте 5 повторов на каждую сторону'],
    benefits: ['Снимает напряжение в спине', 'Улучшает подвижность позвоночника', 'Массирует внутренние органы']
  },
];

const categoryNames = {
  eyes: 'Глаза',
  neck: 'Шея',
  hands: 'Кисти',
  back: 'Спина'
};

const categoryColors = {
  eyes: 'bg-accent',
  neck: 'bg-secondary',
  hands: 'bg-primary',
  back: 'bg-destructive'
};

function Index() {
  const [currentView, setCurrentView] = useState<'timer' | 'exercises' | 'stats' | 'settings'>('timer');
  const [breakDuration, setBreakDuration] = useState(20);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isActive, setIsActive] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedToday, setCompletedToday] = useState(8);
  const [streak, setStreak] = useState(12);
  const [totalMinutes, setTotalMinutes] = useState(247);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationShown, setNotificationShown] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(10);
  const [userName, setUserName] = useState('Разработчик');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [exerciseTimeLeft, setExerciseTimeLeft] = useState<number | null>(null);
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 30 && !notificationShown && soundEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGe58OScTgwOUKfk77RiHAU7k9n0ynYpBSh+zPLaizsKFF+06+mlUxIJSKDh8bllHgYtgsz02Ik1CBdpvO7lm0wLDlCm5O+zYRsGPJPZ9Mp1KAYpfsvy2os6ChVftOvopVISCkig4e+4Yh0FLYPNc9iJNAgXar3u5JpLCw5Qpubtsl8bBj2T2fPJcyYGKn/M8tuKOQgWYLTo6aFRCwlJoe/us2AdBi6Czn7Xhy8IFmuC7+OYSwoPUKvm7rFf');
      audio.play().catch(() => {});
      setNotificationShown(true);
    }
    
    if (timeLeft === 0 && soundEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGe58OScTgwOUKfk77RiHAU7k9n0ynYpBSh+zPLaizsKFF+06+mlUxIJSKDh8bllHgYtgsz02Ik1CBdpvO7lm0wLDlCm5O+zYRsGPJPZ9Mp1KAYpfsvy2os6ChVftOvopVISCkig4e+4Yh0FLYPNc9iJNAgXar3u5JpLCw5Qpubtsl8bBj2T2fPJcyYGKn/M8tuKOQgWYLTo6aFRCwlJoe/us2AdBi6Czn7Xhy8IFmuC7+OYSwoPUKvm7rFf');
      audio.play().catch(() => {});
    }
    
    if (timeLeft > 30) {
      setNotificationShown(false);
    }
  }, [timeLeft, soundEnabled, notificationShown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100;
  
  const handleDurationChange = (minutes: number) => {
    setBreakDuration(minutes);
    setTimeLeft(minutes * 60);
    setNotificationShown(false);
  };

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setExerciseTimeLeft(exercise.duration);
    setIsExerciseActive(false);
    setCurrentStep(0);
  };

  const toggleExerciseTimer = () => {
    setIsExerciseActive(!isExerciseActive);
  };

  const completeExercise = () => {
    setCompletedToday(prev => prev + 1);
    setTotalMinutes(prev => prev + Math.ceil((selectedExercise?.duration || 0) / 60));
    setSelectedExercise(null);
    setExerciseTimeLeft(null);
    setIsExerciseActive(false);
    setCurrentStep(0);
  };

  useEffect(() => {
    let interval: number | undefined;
    
    if (isExerciseActive && exerciseTimeLeft !== null && exerciseTimeLeft > 0) {
      interval = setInterval(() => {
        setExerciseTimeLeft(time => {
          if (time === null || time <= 1) {
            setIsExerciseActive(false);
            if (soundEnabled) {
              const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGe58OScTgwOUKfk77RiHAU7k9n0ynYpBSh+zPLaizsKFF+06+mlUxIJSKDh8bllHgYtgsz02Ik1CBdpvO7lm0wLDlCm5O+zYRsGPJPZ9Mp1KAYpfsvy2os6ChVftOvopVISCkig4e+4Yh0FLYPNc9iJNAgXar3u5JpLCw5Qpubtsl8bBj2T2fPJcyYGKn/M8tuKOQgWYLTo6aFRCwlJoe/us2AdBi6Czn7Xhy8IFmuC7+OYSwoPUKvm7rFf');
              audio.play().catch(() => {});
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isExerciseActive, exerciseTimeLeft, soundEnabled]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-md mx-auto p-4 pb-20">
        <header className="mb-6 pt-4 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            DevFit
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Здоровье программиста</p>
        </header>

        <div className="space-y-4">
          {currentView === 'timer' && (
            <div className="animate-scale-in space-y-4">
              <Card className="p-4 bg-gradient-to-br from-muted/30 to-muted/10">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  Интервал перерыва
                </h3>
                <div className="flex gap-2">
                  {[15, 20, 25, 30].map((minutes) => (
                    <Button
                      key={minutes}
                      onClick={() => handleDurationChange(minutes)}
                      variant={breakDuration === minutes ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      {minutes} мин
                    </Button>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Следующий перерыв</span>
                  </div>
                  
                  <div className="text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {formatTime(timeLeft)}
                  </div>
                  
                  <Progress value={progressPercentage} className="h-3" />
                  
                  <div className="flex gap-2 justify-center pt-2">
                    <Button 
                      onClick={() => setIsActive(!isActive)}
                      variant={isActive ? "outline" : "default"}
                      size="lg"
                      className="gap-2"
                    >
                      <Icon name={isActive ? "Pause" : "Play"} size={20} />
                      {isActive ? 'Пауза' : 'Старт'}
                    </Button>
                    <Button 
                      onClick={() => handleDurationChange(breakDuration)}
                      variant="outline"
                      size="lg"
                    >
                      <Icon name="RotateCcw" size={20} />
                    </Button>
                    <Button 
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      <Icon name={soundEnabled ? "Volume2" : "VolumeX"} size={20} />
                    </Button>
                  </div>
                  
                  {timeLeft <= 30 && timeLeft > 0 && (
                    <div className="mt-4 p-3 bg-primary/20 border border-primary/40 rounded-lg animate-pulse-slow">
                      <p className="text-sm font-semibold text-primary">
                        ⏰ Перерыв через {timeLeft} секунд!
                      </p>
                    </div>
                  )}
                  
                  {timeLeft === 0 && (
                    <div className="mt-4 p-4 bg-accent/20 border-2 border-accent rounded-lg animate-scale-in">
                      <p className="text-lg font-bold text-accent mb-2">
                        🎯 Время для перерыва!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Выбери упражнение и позаботься о здоровье
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-3">
                <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="text-2xl font-bold text-primary">{completedToday}</div>
                  <div className="text-xs text-muted-foreground mt-1">Сегодня</div>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-secondary/10 to-secondary/5">
                  <div className="text-2xl font-bold text-secondary">{streak}</div>
                  <div className="text-xs text-muted-foreground mt-1">Дней подряд</div>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-accent/10 to-accent/5">
                  <div className="text-2xl font-bold text-accent">{totalMinutes}</div>
                  <div className="text-xs text-muted-foreground mt-1">Минут всего</div>
                </Card>
              </div>

              <Card className="p-4 bg-gradient-to-r from-secondary/20 to-accent/20 border-secondary/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary/20">
                    <Icon name="Trophy" size={24} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Отличная работа!</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ещё 2 упражнения до достижения "Железная дисциплина"
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {currentView === 'exercises' && (
            <div className="animate-fade-in space-y-4">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="eyes">👁️</TabsTrigger>
                  <TabsTrigger value="neck">🦴</TabsTrigger>
                  <TabsTrigger value="hands">✋</TabsTrigger>
                  <TabsTrigger value="back">💪</TabsTrigger>
                </TabsList>
                
                {['all', 'eyes', 'neck', 'hands', 'back'].map(category => (
                  <TabsContent key={category} value={category} className="space-y-3 mt-4">
                    {exercises
                      .filter(ex => category === 'all' || ex.category === category)
                      .map(exercise => (
                        <Card 
                          key={exercise.id}
                          className="p-4 cursor-pointer hover:border-primary/50 transition-all hover:scale-[1.02]"
                          onClick={() => startExercise(exercise)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-xl ${categoryColors[exercise.category]}/20`}>
                              <Icon name={exercise.icon as any} size={24} className={categoryColors[exercise.category].replace('bg-', 'text-')} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{exercise.title}</h3>
                                <Badge variant="secondary" className="text-xs">{exercise.duration}с</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{exercise.description}</p>
                              <div className="mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {categoryNames[exercise.category]}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {currentView === 'exercises' && selectedExercise && (
            <div className="animate-scale-in space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedExercise(null)}
                className="mb-2"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад к списку
              </Button>

              <Card className="p-6 bg-gradient-to-br from-card to-muted/5">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-4 rounded-2xl ${categoryColors[selectedExercise.category]}/20`}>
                    <Icon name={selectedExercise.icon as any} size={32} className={categoryColors[selectedExercise.category].replace('bg-', 'text-')} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">{selectedExercise.title}</h2>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">{categoryNames[selectedExercise.category]}</Badge>
                      <Badge variant="secondary">{selectedExercise.duration}с</Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="text-6xl font-bold text-primary">
                        {exerciseTimeLeft !== null ? formatTime(exerciseTimeLeft) : formatTime(selectedExercise.duration)}
                      </div>
                      <div className="text-sm text-center text-muted-foreground mt-1">осталось</div>
                    </div>
                  </div>

                  <Progress 
                    value={exerciseTimeLeft !== null ? ((selectedExercise.duration - exerciseTimeLeft) / selectedExercise.duration) * 100 : 0} 
                    className="h-3 mb-4"
                  />

                  <div className="flex gap-2">
                    <Button
                      onClick={toggleExerciseTimer}
                      className="flex-1"
                      size="lg"
                    >
                      <Icon name={isExerciseActive ? "Pause" : "Play"} size={20} className="mr-2" />
                      {isExerciseActive ? 'Пауза' : 'Старт'}
                    </Button>
                    {exerciseTimeLeft !== null && exerciseTimeLeft <= 0 && (
                      <Button
                        onClick={completeExercise}
                        variant="default"
                        className="flex-1 bg-gradient-to-r from-secondary to-accent"
                        size="lg"
                      >
                        <Icon name="Check" size={20} className="mr-2" />
                        Завершить
                      </Button>
                    )}
                  </div>
                </div>

                {selectedExercise.benefits && (
                  <div className="mb-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-accent">
                      <Icon name="Sparkles" size={18} />
                      Польза
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {selectedExercise.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedExercise.steps && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="ListOrdered" size={18} className="text-primary" />
                      Пошаговая инструкция
                    </h3>
                    <div className="space-y-3">
                      {selectedExercise.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`flex gap-3 p-3 rounded-lg transition-all ${
                            idx === currentStep && isExerciseActive
                              ? 'bg-primary/20 border-2 border-primary scale-105'
                              : 'bg-muted/30'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            idx === currentStep && isExerciseActive
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {idx + 1}
                          </div>
                          <p className="text-sm flex-1 self-center">{step}</p>
                          {idx === currentStep && isExerciseActive && (
                            <Icon name="Activity" size={20} className="text-primary animate-pulse flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    {selectedExercise.steps && (
                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                          disabled={currentStep === 0}
                          className="flex-1"
                        >
                          <Icon name="ChevronLeft" size={16} className="mr-1" />
                          Назад
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentStep(Math.min((selectedExercise.steps?.length || 1) - 1, currentStep + 1))}
                          disabled={currentStep === (selectedExercise.steps?.length || 1) - 1}
                          className="flex-1"
                        >
                          Далее
                          <Icon name="ChevronRight" size={16} className="ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>
          )}

          {currentView === 'stats' && (
            <div className="animate-fade-in space-y-4">
              <Card className="p-6 bg-gradient-to-br from-card to-muted/5">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                  Статистика недели
                </h2>
                
                <div className="space-y-3">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => {
                    const value = [12, 10, 15, 8, 14, 6, 8][index];
                    const maxValue = 15;
                    return (
                      <div key={day} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{day}</span>
                          <span className="font-semibold">{value} упр.</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                            style={{ width: `${(value / maxValue) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5">
                  <Icon name="Flame" size={28} className="text-accent mb-2" />
                  <div className="text-2xl font-bold">{streak}</div>
                  <div className="text-xs text-muted-foreground mt-1">Дней стрик</div>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
                  <Icon name="Clock" size={28} className="text-primary mb-2" />
                  <div className="text-2xl font-bold">{totalMinutes}</div>
                  <div className="text-xs text-muted-foreground mt-1">Минут активности</div>
                </Card>
              </div>

              <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Award" size={20} className="text-secondary" />
                  Достижения
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: 'Medal', active: true },
                    { icon: 'Trophy', active: true },
                    { icon: 'Star', active: true },
                    { icon: 'Zap', active: false },
                    { icon: 'Crown', active: true },
                    { icon: 'Target', active: false },
                    { icon: 'Rocket', active: false },
                    { icon: 'Sparkles', active: true },
                  ].map((achievement, i) => (
                    <div 
                      key={i}
                      className={`aspect-square rounded-xl flex items-center justify-center ${
                        achievement.active 
                          ? 'bg-gradient-to-br from-secondary to-accent' 
                          : 'bg-muted opacity-30'
                      }`}
                    >
                      <Icon name={achievement.icon as any} size={24} className="text-white" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {currentView === 'settings' && (
            <div className="animate-fade-in space-y-4">
              <Card className="p-6 bg-gradient-to-br from-card to-muted/5">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="User" size={20} className="text-primary" />
                  Профиль
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Введите имя"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="Bell" size={20} className="text-accent" />
                      <div>
                        <p className="font-semibold text-sm">Напоминания</p>
                        <p className="text-xs text-muted-foreground">Уведомления о перерывах</p>
                      </div>
                    </div>
                    <Button
                      variant={reminderEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => setReminderEnabled(!reminderEnabled)}
                    >
                      {reminderEnabled ? 'Вкл' : 'Выкл'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name={soundEnabled ? "Volume2" : "VolumeX"} size={20} className="text-secondary" />
                      <div>
                        <p className="font-semibold text-sm">Звук</p>
                        <p className="text-xs text-muted-foreground">Звуковые уведомления</p>
                      </div>
                    </div>
                    <Button
                      variant={soundEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                    >
                      {soundEnabled ? 'Вкл' : 'Выкл'}
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="Target" size={20} className="text-primary" />
                  Цель на день
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Упражнений в день</span>
                    <span className="text-2xl font-bold text-primary">{dailyGoal}</span>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="5"
                      value={dailyGoal}
                      onChange={(e) => setDailyGoal(Number(e.target.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((dailyGoal - 5) / 25) * 100}%, hsl(var(--muted)) ${((dailyGoal - 5) / 25) * 100}%, hsl(var(--muted)) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5</span>
                      <span>15</span>
                      <span>30</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-background/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Прогресс сегодня</span>
                      <span className="text-sm font-bold text-primary">{completedToday}/{dailyGoal}</span>
                    </div>
                    <Progress value={(completedToday / dailyGoal) * 100} className="h-2" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-secondary/10 to-accent/10">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Info" size={20} className="text-accent" />
                  О приложении
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>DevFit v1.0</p>
                  <p>Помогаем программистам заботиться о здоровье во время работы</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-semibold text-foreground mb-2">Рекомендации:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Делайте перерыв каждые 20-25 минут</li>
                      <li>• Используйте правило 20-20-20 для глаз</li>
                      <li>• Регулярно меняйте позу</li>
                      <li>• Не забывайте про растяжку</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-md mx-auto flex justify-around p-4">
          <Button
            variant={currentView === 'timer' ? 'default' : 'ghost'}
            className="flex-col h-auto gap-1 px-4"
            onClick={() => setCurrentView('timer')}
          >
            <Icon name="Timer" size={24} />
            <span className="text-xs">Таймер</span>
          </Button>
          <Button
            variant={currentView === 'exercises' ? 'default' : 'ghost'}
            className="flex-col h-auto gap-1 px-4"
            onClick={() => setCurrentView('exercises')}
          >
            <Icon name="Dumbbell" size={24} />
            <span className="text-xs">Упражнения</span>
          </Button>
          <Button
            variant={currentView === 'stats' ? 'default' : 'ghost'}
            className="flex-col h-auto gap-1 px-4"
            onClick={() => setCurrentView('stats')}
          >
            <Icon name="BarChart3" size={24} />
            <span className="text-xs">Статистика</span>
          </Button>
          <Button
            variant={currentView === 'settings' ? 'default' : 'ghost'}
            className="flex-col h-auto gap-1 px-4"
            onClick={() => setCurrentView('settings')}
          >
            <Icon name="Settings" size={24} />
            <span className="text-xs">Настройки</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Index;