import { useState } from 'react';

import bugImageUrl from '../../assets/img/bug.svg';
import ideaImageUrl from '../../assets/img/idea.svg';
import thoughtImageUrl from '../../assets/img/thought.svg';
import { FeedBackTypeStep } from './Steps/FeedBackTypeStep';
import { FeedBackContentStep } from './Steps/FeedBackContentStep';
import { FeedBackSuccessStep } from './Steps/FeedBackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto',
    },
    textarea: {
      placeholder:
        'Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada',
    },
    textarea: {
      placeholder:
        'Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento',
    },
    textarea: {
      placeholder: 'Queremos te ouvir. O que você gostaria de nos dizer?',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="flex relative flex-col items-center p-4 mb-4 w-[calc(100vw-2rem)] bg-zinc-900 rounded-2xl shadow-lg md:w-auto">
      {feedbackSent ? (
        <FeedBackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedBackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedBackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{' '}
        <a
          href="https://rocketseat.com.br"
          className="underline underline-offset-2"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
